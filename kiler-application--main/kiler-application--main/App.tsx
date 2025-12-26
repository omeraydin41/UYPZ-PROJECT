
import React, { useState, useEffect } from 'react';
import { AppView, UserAccount, PlanType, Recipe } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import IngredientSearch from './components/IngredientSearch';
import BudgetSearch from './components/BudgetSearch';
import Layout from './components/Layout';
import { Language, Theme } from './translations';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('login');
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<UserAccount[]>([]);
  const [showRegisterOnLogin, setShowRegisterOnLogin] = useState(false);
  
  // Settings States
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('kiler_lang') as Language) || 'tr');
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('kiler_theme') as Theme) || 'light');

  useEffect(() => {
    const savedUsers = localStorage.getItem('kiler_users');
    if (savedUsers) setRegisteredUsers(JSON.parse(savedUsers));
    
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('kiler_lang', lang);
  };

  const handleThemeChange = (t: Theme) => {
    setTheme(t);
    localStorage.setItem('kiler_theme', t);
  };

  const handleLogin = (userObj: UserAccount | string) => {
    if (typeof userObj === 'string') {
      setCurrentUser({
        fullName: language === 'tr' ? 'Misafir' : 'Guest',
        username: 'misafir',
        email: 'guest@kiler.com',
        password: '',
        planType: 'Şef',
        joinDate: new Date().toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US'),
        savedRecipes: []
      });
    } else {
      setCurrentUser({ ...userObj, savedRecipes: userObj.savedRecipes || [] });
    }
    setView('dashboard');
    setShowRegisterOnLogin(false);
  };

  const syncUserToStorage = (updatedUser: UserAccount) => {
    setCurrentUser(updatedUser);
    if (updatedUser.username !== 'misafir') {
      const updatedUsers = registeredUsers.map(u => 
        u.username === updatedUser.username ? updatedUser : u
      );
      setRegisteredUsers(updatedUsers);
      localStorage.setItem('kiler_users', JSON.stringify(updatedUsers));
    }
  };

  const handleUpdatePlan = (newPlan: PlanType) => {
    if (currentUser) {
      syncUserToStorage({ ...currentUser, planType: newPlan });
    }
  };

  const handleToggleSaveRecipe = (recipe: Recipe) => {
    if (!currentUser) return;
    const currentSaved = currentUser.savedRecipes || [];
    const isAlreadySaved = currentSaved.some(r => r.name === recipe.name);
    
    let updatedSaved;
    if (isAlreadySaved) {
      updatedSaved = currentSaved.filter(r => r.name !== recipe.name);
    } else {
      updatedSaved = [...currentSaved, recipe];
    }
    
    syncUserToStorage({ ...currentUser, savedRecipes: updatedSaved });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('login');
    setShowRegisterOnLogin(false);
  };

  const handleGoToRegister = () => {
    setCurrentUser(null);
    setView('login');
    setShowRegisterOnLogin(true);
  };

  const handleRegister = (newUser: UserAccount) => {
    const updatedUsers = [...registeredUsers, { ...newUser, savedRecipes: [] }];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('kiler_users', JSON.stringify(updatedUsers));
  };

  const renderView = () => {
    switch (view) {
      case 'login':
        return (
          <Login 
            onLogin={handleLogin} 
            onRegister={handleRegister} 
            registeredUsers={registeredUsers} 
            initialShowRegister={showRegisterOnLogin}
            lang={language}
          />
        );
      case 'dashboard':
        return <Dashboard setView={setView} userName={currentUser?.fullName || ''} lang={language} planType={currentUser?.planType || 'Şef'} onToggleSave={handleToggleSaveRecipe} savedRecipes={currentUser?.savedRecipes || []} />;
      case 'ingredient-search':
        return <IngredientSearch onBack={() => setView('dashboard')} lang={language} planType={currentUser?.planType || 'Şef'} onToggleSave={handleToggleSaveRecipe} savedRecipes={currentUser?.savedRecipes || []} />;
      case 'budget-search':
        return <BudgetSearch onBack={() => setView('dashboard')} lang={language} planType={currentUser?.planType || 'Şef'} onToggleSave={handleToggleSaveRecipe} savedRecipes={currentUser?.savedRecipes || []} />;
      default:
        return <Login onLogin={handleLogin} onRegister={handleRegister} registeredUsers={registeredUsers} lang={language} />;
    }
  };

  if (view === 'login') return renderView();

  return (
    <Layout 
      onLogout={handleLogout} 
      onHome={() => setView('dashboard')}
      user={currentUser}
      onRegisterClick={handleGoToRegister}
      lang={language}
      onLanguageChange={handleLanguageChange}
      theme={theme}
      onThemeChange={handleThemeChange}
      onPlanChange={handleUpdatePlan}
      onToggleSave={handleToggleSaveRecipe}
    >
      {renderView()}
    </Layout>
  );
};

export default App;
