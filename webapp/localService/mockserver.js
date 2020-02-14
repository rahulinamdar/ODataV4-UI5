sap.ui.define([
	"sap/ui/core/util/MockServer",
	"sap/base/Log"
], function(MockServer, Log) {
	"use strict";
	
	var oMockServer,
			_sAppModulePath = "com/rahul/ODataV4SmartControls/",
			_sLocalPath = "localService/",
			_sJsonFilesModulePath = _sAppModulePath + _sLocalPath + "mockdata";
	return {
		/**
		 * Initializes the mock server.
		 * You can configure the delay with the URL parameter "serverDelay".
		 * The local mock data in this folder is returned instead of the real data for testing.
		 * @public
		 */
		init: function() {
				var sJsonFilesUrl = jQuery.sap.getModulePath(_sJsonFilesModulePath),
					sManifestUrl = jQuery.sap.getModulePath(_sAppModulePath + "manifest", ".json"),
					oManifest = jQuery.sap.syncGetJSON(sManifestUrl).data,
					oMainDataSource = oManifest["sap.app"].dataSources.mainService,
					sMetadataUrl = jQuery.sap.getModulePath(_sAppModulePath + oMainDataSource.settings.localUri.replace(".xml", ""), ".xml"),
					// ensure there is a trailing slash
					sMockServerUrl = /.*\/$/.test(oMainDataSource.uri) ? oMainDataSource.uri : oMainDataSource.uri + "/";
			
			// create
			 oMockServer = new MockServer({
				rootUri: sMockServerUrl
			});
			

			// simulate against the metadata and mock data
			oMockServer.simulate(sMetadataUrl, {
				sMockdataBaseUrl: sJsonFilesUrl,
				bGenerateMissingMockData: true
			});

			// start
			oMockServer.start();

			Log.info("Running the app with mock data");
		}

	};

});