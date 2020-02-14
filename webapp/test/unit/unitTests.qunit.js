/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/rahul/ODataV4SmartControls/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});