import { pageTitle } from 'ember-page-title';
import TpkDashboard from '@triptyk/ember-ui/components/prefabs/tpk-dashboard';
import { hash } from '@ember/helper';

const handleLogout = () => {
  console.log('Logging out...');
  // Add your logout logic here (e.g., clear session, redirect to login, etc.)
};

const menuItems = () => {
  return [
    {
      label: 'Input validation prefab',
      route: 'docs.ember-input-validation.prefab.input',
      tooltip: 'Input validation prefab',
    },
  ];
};

<template>
  {{pageTitle "DocApp"}}

  {{! The following component displays Ember's default welcome message. }}
  <TpkDashboard
    @title="DocApp"
    @currentUser={{hash fullName="John Doe"}}
    @onLogout={{handleLogout}}
    @profileRoute="application"
    @sidebarItems={{menuItems}}
  >
    {{outlet}}
  </TpkDashboard>
</template>
