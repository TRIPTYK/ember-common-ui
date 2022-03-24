import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const backendArray = [
  'Aberdeen',
  'Abilene',
  'Akron',
  'Albany',
  'Albuquerque',
  'Alexandria',
  'Allentown',
  'Amarillo',
  'Anaheim',
  'Anchorage',
  'Ann Arbor',
  'Antioch',
  'Apple Valley',
  'Appleton',
  'Arlington',
  'Arvada',
  'Asheville',
  'Athens',
  'Atlanta',
  'Atlantic City',
  'Augusta',
  'Aurora',
  'Austin',
  'Bakersfield',
  'Baltimore',
  'Barnstable',
  'Baton Rouge',
  'Beaumont',
  'Bel Air',
  'Bellevue',
  'Berkeley',
  'Bethlehem',
  'Billings',
  'Birmingham',
  'Bloomington',
  'Boise',
  'Boise City',
  'Bonita Springs',
  'Boston',
  'Boulder',
  'Bradenton',
  'Bremerton',
  'Bridgeport',
  'Brighton',
  'Brownsville',
  'Bryan',
  'Buffalo',
  'Burbank',
  'Burlington',
  'Cambridge',
  'Canton',
  'Cape Coral',
  'Carrollton',
  'Cary',
  'Cathedral City',
  'Cedar Rapids',
  'Champaign',
  'Chandler',
  'Charleston',
  'Charlotte',
  'Chattanooga',
  'Chesapeake',
  'Chicago',
  'Chula Vista',
  'Cincinnati',
  'Clarke County',
  'Clarksville',
  'Clearwater',
  'Cleveland',
  'College Station',
  'Colorado Springs',
  'Columbia',
  'Columbus',
  'Concord',
  'Coral Springs',
  'Corona',
  'Corpus Christi',
  'Costa Mesa',
  'Dallas',
  'Daly City',
  'Danbury',
  'Davenport',
  'Davidson County',
  'Dayton',
  'Daytona Beach',
  'Deltona',
  'Denton',
  'Denver',
  'Des Moines',
  'Detroit',
  'Downey',
  'Duluth',
  'Durham',
  'El Monte',
  'El Paso',
  'Elizabeth',
  'Elk Grove',
  'Elkhart',
  'Erie',
  'Escondido',
  'Eugene',
  'Evansville',
  'Fairfield',
  'Fargo',
  'Fayetteville',
  'Fitchburg',
  'Flint',
  'Fontana',
  'Fort Collins',
  'Fort Lauderdale',
  'Fort Smith',
  'Fort Walton Beach',
  'Fort Wayne',
  'Fort Worth',
  'Frederick',
  'Fremont',
  'Fresno',
  'Fullerton',
  'Gainesville',
  'Garden Grove',
  'Garland',
  'Gastonia',
  'Gilbert',
  'Glendale',
  'Grand Prairie',
  'Grand Rapids',
  'Grayslake',
  'Green Bay',
  'GreenBay',
  'Greensboro',
  'Greenville',
  'Gulfport-Biloxi',
  'Hagerstown',
  'Hampton',
  'Harlingen',
  'Harrisburg',
  'Hartford',
  'Havre de Grace',
  'Hayward',
  'Hemet',
  'Henderson',
  'Hesperia',
  'Hialeah',
  'Hickory',
  'High Point',
  'Hollywood',
  'Honolulu',
  'Houma',
  'Houston',
  'Howell',
  'Huntington',
  'Huntington Beach',
  'Huntsville',
  'Independence',
  'Indianapolis',
  'Inglewood',
  'Irvine',
  'Irving',
  'Jackson',
  'Jacksonville',
  'Jefferson',
  'Jersey City',
  'Johnson City',
  'Joliet',
  'Kailua',
  'Kalamazoo',
  'Kaneohe',
  'Kansas City',
  'Kennewick',
  'Kenosha',
  'Killeen',
  'Kissimmee',
  'Knoxville',
  'Lacey',
  'Lafayette',
  'Lake Charles',
  'Lakeland',
  'Lakewood',
  'Lancaster',
  'Lansing',
  'Laredo',
  'Las Cruces',
  'Las Vegas',
  'Layton',
  'Leominster',
  'Lewisville',
  'Lexington',
  'Lincoln',
  'Little Rock',
  'Long Beach',
  'Lorain',
  'Los Angeles',
  'Louisville',
  'Lowell',
  'Lubbock',
  'Macon',
  'Madison',
  'Manchester',
  'Marina',
  'Marysville',
  'McAllen',
  'McHenry',
  'Medford',
  'Melbourne',
  'Memphis',
  'Merced',
  'Mesa',
  'Mesquite',
  'Miami',
  'Milwaukee',
  'Minneapolis',
  'Miramar',
  'Mission Viejo',
  'Mobile',
  'Modesto',
  'Monroe',
  'Monterey',
  'Montgomery',
  'Moreno Valley',
  'Murfreesboro',
  'Murrieta',
  'Muskegon',
  'Myrtle Beach',
  'Naperville',
  'Naples',
  'Nashua',
  'Nashville',
  'New Bedford',
  'New Haven',
  'New London',
  'New Orleans',
  'New York',
  'New York City',
  'Newark',
  'Newburgh',
  'Newport News',
  'Norfolk',
  'Normal',
  'Norman',
  'North Charleston',
  'North Las Vegas',
  'North Port',
  'Norwalk',
  'Norwich',
  'Oakland',
  'Ocala',
  'Oceanside',
  'Odessa',
  'Ogden',
  'Oklahoma City',
  'Olathe',
  'Olympia',
  'Omaha',
  'Ontario',
  'Orange',
  'Orem',
  'Orlando',
  'Overland Park',
  'Oxnard',
  'Palm Bay',
  'Palm Springs',
  'Palmdale',
  'Panama City',
  'Pasadena',
  'Paterson',
  'Pembroke Pines',
  'Pensacola',
  'Peoria',
  'Philadelphia',
  'Phoenix',
  'Pittsburgh',
  'Plano',
  'Pomona',
  'Pompano Beach',
  'Port Arthur',
  'Port Orange',
  'Port Saint Lucie',
  'Port St. Lucie',
  'Portland',
  'Portsmouth',
  'Poughkeepsie',
  'Providence',
  'Provo',
  'Pueblo',
  'Punta Gorda',
  'Racine',
  'Raleigh',
  'Rancho Cucamonga',
  'Reading',
  'Redding',
  'Reno',
  'Richland',
  'Richmond',
  'Richmond County',
  'Riverside',
  'Roanoke',
  'Rochester',
  'Rockford',
  'Roseville',
  'Round Lake Beach',
  'Sacramento',
  'Saginaw',
  'Saint Louis',
  'Saint Paul',
  'Saint Petersburg',
  'Salem',
  'Salinas',
  'Salt Lake City',
  'San Antonio',
  'San Bernardino',
  'San Buenaventura',
  'San Diego',
  'San Francisco',
  'San Jose',
  'Santa Ana',
  'Santa Barbara',
  'Santa Clara',
  'Santa Clarita',
  'Santa Cruz',
  'Santa Maria',
  'Santa Rosa',
  'Sarasota',
  'Savannah',
  'Scottsdale',
  'Scranton',
  'Seaside',
  'Seattle',
  'Sebastian',
  'Shreveport',
  'Simi Valley',
  'Sioux City',
  'Sioux Falls',
  'South Bend',
  'South Lyon',
  'Spartanburg',
  'Spokane',
  'Springdale',
  'Springfield',
  'St. Louis',
  'St. Paul',
  'St. Petersburg',
  'Stamford',
  'Sterling Heights',
  'Stockton',
  'Sunnyvale',
  'Syracuse',
  'Tacoma',
  'Tallahassee',
  'Tampa',
  'Temecula',
  'Tempe',
  'Thornton',
  'Thousand Oaks',
  'Toledo',
  'Topeka',
  'Torrance',
  'Trenton',
  'Tucson',
  'Tulsa',
  'Tuscaloosa',
  'Tyler',
  'Utica',
  'Vallejo',
  'Vancouver',
  'Vero Beach',
  'Victorville',
  'Virginia Beach',
  'Visalia',
  'Waco',
  'Warren',
  'Washington',
  'Waterbury',
  'Waterloo',
  'West Covina',
  'West Valley City',
  'Westminster',
  'Wichita',
  'Wilmington',
  'Winston',
  'Winter Haven',
  'Worcester',
  'Yakima',
  'Yonkers',
  'York',
  'Youngstown',
] as string[];

module('Integration | Component | tpk-select', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders complex', async function (assert) {
    this.set('selected', []);
    this.set('options', [...backendArray]);
    this.set('selectElement', (e: string, alreadySelected: boolean) => {
      // eslint-disable-next-line ember/no-get
      const selected = this.get('selected') as string[];
      this.set(
        'selected',
        alreadySelected ? selected.filter((s) => s !== e) : [...selected, e]
      );
    });
    this.set('search', (searchText: string) => {
      this.set(
        'options',
        backendArray.filter((e) => e.includes(searchText))
      );
    });

    await render(hbs`
      <TpkSelect 
        @multiple={{true}} 
        @options={{this.options}} 
        @selected={{this.selected}} 
        @onSelect={{this.selectElement}} 
        @onSearch={{this.search}}
      as |S|>
        <S.Label />
        <S.Button as |selected|>
        </S.Button>
        <S.Container as |C|>
          <div class="absolute w-full">
            <C.Searchbar />
            <C.Options as |Opts|>
              <Opts as |Opt|>
                <span class={{if Opt.isSelected "text-green-400"}}>{{Opt.option}}</span>
              </Opts>
            </C.Options>
          </div>
        </S.Container>
      </TpkSelect>
      <div>aaaa</div>
    `);

    assert.expect(0);
  });

  test('it renders default', async function (assert) {
    this.set('selected', []);
    this.set('options', [...backendArray]);
    this.set('selectElement', (e: string, alreadySelected: boolean) => {
      // eslint-disable-next-line ember/no-get
      const selected = this.get('selected') as string[];
      this.set(
        'selected',
        alreadySelected ? selected.filter((s) => s !== e) : [...selected, e]
      );
    });
    this.set('search', (searchText: string) => {
      this.set(
        'options',
        backendArray.filter((e) => e.includes(searchText))
      );
    });
    this.set('rm', (e: Event) => {
      console.log(e);
    });

    await render(hbs`
      <TpkSelect 
        @multiple={{true}} 
        @options={{this.options}} 
        @selected={{this.selected}} 
        @onSelect={{this.selectElement}} 
        @onSearch={{this.search}}
        @defaultText="Please select something"
      >
        <:selected as |s|>
          <button type="button" {{on "click" this.rm}} class="text-red-400">{{s}}</button>
        </:selected>
        <:option as |o|>
          {{o.option}}
        </:option>
      </TpkSelect>
      <div>aaa</div>
    `);

    await this.pauseTest();

    assert.expect(0);
  });
});
