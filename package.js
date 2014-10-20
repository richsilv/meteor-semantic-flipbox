Package.describe({
	summary: "Flipbox plugin for Semantic-UI. An alternative to checkbox/toggle/slider for offering two options.",
  	version: "1.0.6",
  	git: "https://github.com/richsilv/meteor-semantic-flipbox.git"
});

Package.on_use(function (api) {
 	api.versionsFrom("METEOR@0.9.1");
	api.use('jquery', 'client');

	api.add_files('client/flipbox.css', 'client');
	api.add_files('client/flipbox.js', 'client');
});