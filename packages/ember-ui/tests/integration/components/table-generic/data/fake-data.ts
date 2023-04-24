export default {
  headerTest: [
    { prop: 'lastName', label: 'Nom', sortable: true },
    { prop: 'firstName', label: 'Prénom', sortable: true },
    { prop: 'email', label: 'Email', sortable: true },
    { prop: 'phone', label: 'Téléphone', sortable: true },
    { prop: 'job', label: 'travail', sortable: true },
    { prop: 'country', label: 'pays', sortable: true },
  ],
  dataTest: [
    {
      type: 'user',
      id: '1',
      attributes: {
        lastName: 'Marc',
        firstName: 'Jean',
        phone: '04569593934',
        email: 'dev@triptyk.eu',
        job: 'Boulanger',
        country: 'Belgique',
      },
    },
    {
      type: 'user',
      id: '2',
      attributes: {
        lastName: 'Lepond',
        firstName: 'Louis',
        phone: '04569432034',
        email: 'dev@triptyk.eu',
        job: 'dev',
        country: 'France',
      },
    },
    {
      type: 'user',
      id: '3',
      attributes: {
        lastName: 'Dragon',
        firstName: 'Lucas',
        phone: '048593944',
        email: 'dev@triptyk.eu',
        job: 'Vétérinaire',
        country: 'Espagne',
      },
    },
    {
      type: 'user',
      id: '4',
      attributes: {
        lastName: 'Leroy',
        firstName: 'Simon',
        phone: '048234563944',
        email: 'dev@triptyk.eu',
        job: 'ouvrier',
        country: 'Russie',
      },
    },
    {
      type: 'user',
      id: '5',
      attributes: {
        lastName: 'Giga',
        firstName: 'Chad',
        phone: '2345679838',
        email: 'dev@triptyk.eu',
        job: 'Pilote',
        country: 'France',
      },
    },
  ],
  actionData: [
    {
      name: 'delete',
      icon: '/assets/icons/delete.svg',
      action: function () {},
    },
    { name: 'edit', icon: '/assets/icons/edit.svg', action: function () {} },
  ],
};
