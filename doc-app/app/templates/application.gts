import { pageTitle } from 'ember-page-title';
import DummyForm from 'doc-app/components/dummy-form';
import TpkDashboard from '@triptyk/ember-ui/components/prefabs/tpk-dashboard';
import { hash } from '@ember/helper';

const handleLogout = () => {
  console.log('Logging out...');
  // Add your logout logic here (e.g., clear session, redirect to login, etc.)
};

<template>
  {{pageTitle "DocApp"}}

  {{outlet}}

  {{! The following component displays Ember's default welcome message. }}
  <TpkDashboard
    @title="DocApp"
    @currentUser={{hash fullName="John Doe"}}
    @onLogout={{handleLogout}}
    @profileRoute="application"
  >
    <DummyForm />
  </TpkDashboard>
  {{! Feel free to remove this! }}
</template>
