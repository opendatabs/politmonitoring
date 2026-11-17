// Static build for GitHub Pages: there is no Express backend, so the
// public dataset is fetched directly from data.bs.ch (CORS is allowed there).
// Build with: ng build --configuration production,pages
export const environment = {
  production: true,
  apiUrl: '',
  dataUrl:
    'https://data.bs.ch/api/records/1.0/search/?dataset=100086&q=&rows=2000&sort=-signatur&facet=signatur&facet=geschaftstyp&facet=gr_urheber&facet=urheber_name&facet=partei&facet=status&facet=beginn_datum&facet=ende&facet=endfrist&facet=thema_1&facet=thema_2&facet=schwerpunkt',
};
