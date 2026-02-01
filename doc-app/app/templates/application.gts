import { pageTitle } from 'ember-page-title';
//import DummyForm from 'doc-app/components/dummy-form';

<template>
  {{pageTitle "DocApp"}}

  {{outlet}}

  {{! The following component displays Ember's default welcome message. }}
  {{! <DummyForm /> }}
  {{! Feel free to remove this! }}
</template>
