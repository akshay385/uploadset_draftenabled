sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'project1/test/integration/FirstJourney',
		'project1/test/integration/pages/parentList',
		'project1/test/integration/pages/parentObjectPage'
    ],
    function(JourneyRunner, opaJourney, parentList, parentObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('project1') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheparentList: parentList,
					onTheparentObjectPage: parentObjectPage
                }
            },
            opaJourney.run
        );
    }
);