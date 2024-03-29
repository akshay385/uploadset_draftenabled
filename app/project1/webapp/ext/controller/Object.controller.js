sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var extractedNumber;
	var getattachdata;
	var getdraftattachdata;
	var extraEntries

	return ControllerExtension.extend('project1.ext.controller.Object', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf project1.ext.controller.Object
			 */
			onInit: function (oEvent) {
				debugger
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			editFlow : {
				onBeforeSave:async function (oEvent) {debugger
					var allItems = this.base.getView().mAggregations.content[0].mAggregations.sections[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mAggregations.items
					var ocacheItemscache = this.base.getView().mAggregations.content[0].mAggregations.sections[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mBindingInfos.items.binding.oCache.aElements.$byPredicate
					var obitems = this.base.getView().mAggregations.content[0].mAggregations.sections[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mBindingInfos.items.binding.oCache.aElements.$byPredicate

					var valuesArraycache = Object.values(obitems);

					// this.base.getView().mAggregations.content[0].mAggregations.sections[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mBindingInfos.items.binding.aContexts[0].delete()
					for (var i = 0; i < valuesArraycache.length; i++) {
						debugger;
						var isFound = false; 
						for (var j = 0; j < allItems.length; j++) {
							debugger
							var url =allItems[j].mProperties.url
							// Regular expression to match the ID
							var regex = /ID=([a-f\d-]+)/i;

							// Extract the ID using the regular expression
							var match = url.match(regex);
							if (valuesArraycache[i].ID === match[1]) {
								isFound = true; 

								break;
							}
						}
							
							if (!isFound) {
							this.base.getView().mAggregations.content[0].mAggregations.sections[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mBindingInfos.items.binding.aContexts[i].delete()
							}
					}
				},
				onBeforeEdit : async function(oEvent)
				{
					debugger;
					var data = window.location.href;
					const regex = /id='(\d+)'/;
					const match = data.match(regex);
					console.log();
					if (match) {
						extractedNumber = match[1];
						console.log(extractedNumber); // Output: 1
					} else {
						console.log("Number not found in URL");
					}
					// var payload = 
					// {
					// 	url : "/odata/v4/attachments/Files",
					// 	method : "GET",
					// 	headers : {
					// 		"Content-type" : "application/json"
					// 	}
					// }

					// return new Promise((resolve, reject) => {
					// 	$.ajax(payload)
					// 		.done((results, textStatus, request)=> {
					// 			resolve(results);
					// 		})
					// 		.fail((err)=> {
					// 			reject(err);
					// 		})
					// })

					debugger
					let funcname = 'draft_attach';
					let oFunction =oEvent.context.getModel().bindContext(`/${funcname}(...)`);
					console.log();
					oFunction.setParameter('ID',extractedNumber);
					await oFunction.execute();
					const oContext = oFunction.getBoundContext();
					var result = oContext.getValue();
					result = JSON.parse(result.value);
					if(result.length > 0)
					{
					console.log(result);
					var draft_len = result.length;
					console.log(draft_len);
					}
				},
				onBeforeDiscard : async function(oEvent) {
					//when user clicks on the discard draft button this function triggers
					debugger
					//getting data from attachments table
					let funcname = 'get_attach_data';
					let oFunction =oEvent.context.getModel().bindContext(`/${funcname}(...)`);
					console.log();
					oFunction.setParameter('ID',extractedNumber);
					await oFunction.execute();
					const getbound = oFunction.getBoundContext();
					getattachdata = getbound.getValue();	
					if(getattachdata != 'undefined');
					{
					// 	if(getattachdata.value.length != 2)
					// {	
					getattachdata = JSON.parse(getattachdata.value);
					console.log(getattachdata);
					var attach_len = getattachdata.length;
					console.log(attach_len);




					//getting data from draft attachment table
					let func = 'get_draft_attach_data';
					let path =oEvent.context.getModel().bindContext(`/${func}(...)`);
					console.log();
					path.setParameter('ID',extractedNumber);
					await path.execute();
					const bound = path.getBoundContext();
					getdraftattachdata =  bound.getValue();
					getdraftattachdata = JSON.parse(getdraftattachdata.value);
					console.log(getdraftattachdata);
					var draft_len1 = getdraftattachdata.length;
					console.log(draft_len1);
					let matchedtemp_attach_data=[];
					let unmatchedtemp_attach_data=[];

					debugger;
					if (attach_len > draft_len1) {
						// for (let i = 0; i < getattachdata.length; i++) {
						// 	for (let j = 0; j < getdraftattachdata.length; j++) {
						// 		if (getattachdata[i].id == getdraftattachdata[j].id) {
						// 			matchedtemp_attach_data.push(getdraftattachdata[j]);
						// 		}

						// 	}
						// }
						debugger
						extraEntries = [];
						for (let i = 0; i < getattachdata.length; i++) {
							let found = false;
							const item1 = getattachdata[i];
							const item2 = getdraftattachdata[i];

							if (item2 !== undefined && item1.ID === item2.attach_id1 && item1.id1 === item2.parent_id) {
								found = true;
							}

							if (!found ) {
								extraEntries.push(item1);
							}
							else if (item2 === undefined) {
								extraEntries.push(item1);
							}
						}
						debugger;
						console.log(extraEntries);
					}

					if(extraEntries != undefined)
					{

					// const ids = [];
					// const id1s = [];
					var dat = {
						ids : [],
						id1s: []
					}


					extraEntries.forEach(entry => {
						// Extract ID and id1 from each entry
						const id = entry.ID;
						const id1 = entry.id1;

						// Store the extracted ID and id1
						dat.ids.push(id);
						dat.id1s.push(id1);
					});
					var jsString = JSON.stringify(dat);

					let delfunc = 'delete_entry';
					let delpath =oEvent.context.getModel().bindContext(`/${delfunc}(...)`);
					console.log();
					delpath.setParameter('ID',jsString);
					await delpath.execute();
					const delbound = delpath.getBoundContext();
					getdraftattachdata =  delbound.getValue();
					console.log(getdraftattachdata);
					var refresh = this.getView().getContent()[0].getSections()[1].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().mAggregations.items[1].mBindingInfos.items.binding.refresh();
					console.log(refresh);
				}
				// this.base.getView().mAggregations.content[0].mAggregations.sections[1].getBindingContext().refresh();
				sap.ui.getCore().byId("project1::parentObjectPage--fe::CustomSubSection::Attachment--uploadSet").mBindingInfos.items.binding.refresh();
				}

				},
				onAfterDiscard : async function(oEvent) {
					debugger;
					let del_all = 'delete_entry';
					let del_all_path = oEvent.context.getModel().bindContext(`/${del_all}(...)`);
					del_all_path.setParameter('ID',10);
					await del_all_path.execute();
					const del_all_bound = del_all_path.getBoundContext();
					var get_del_message = del_all_bound.getValue();
					console.log(get_del_message);
					debugger
				},
				onAfterSave : async function(oEvent)
				{
					let del_all = 'delete_entry';
					let del_all_path = oEvent.context.getModel().bindContext(`/${del_all}(...)`);
					del_all_path.setParameter('ID',10);
					await del_all_path.execute();
					const del_all_bound = del_all_path.getBoundContext();
					var get_del_message = del_all_bound.getValue();
					console.log(get_del_message);
					debugger
				}

			},
			// editFlow: {
			// 	onBeforeDiscard: async function (oEvent) {
			// 		debugger;
			// 		// var allItems = this.base.getView().mAggregations.content[0].mAggregations.sections[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mAggregations.items
			// 		// var ocacheItemscache = this.base.getView().mAggregations.content[0].mAggregations.sections[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mBindingInfos.items.binding.oCache.aElements.$byPredicate
			// 		// var obitems = this.base.getView().mAggregations.content[0].mAggregations.sections[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mBindingInfos.items.binding.oCache.aElements.$byPredicate

			// 		// var valuesArraycache = Object.values(obitems);

			// 		// // this.base.getView().mAggregations.content[0].mAggregations.sections[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mBindingInfos.items.binding.aContexts[0].delete()
			// 		// for (var i = 0; i < valuesArraycache.length; i++) {
			// 		// 	debugger;
			// 		// 	var isFound = false; 
			// 		// 	for (var j = 0; j < allItems.length; j++) {
			// 		// 		debugger
			// 		// 		var url =allItems[j].mProperties.url
			// 		// 		// Regular expression to match the ID
			// 		// 		var regex = /ID=([a-f\d-]+)/i;

			// 		// 		// Extract the ID using the regular expression
			// 		// 		var match = url.match(regex);
			// 		// 		if (valuesArraycache[i].ID === match[1]) {
			// 		// 			isFound = true; 

			// 		// 			break;
			// 		// 		}
			// 		// 	}
							
			// 		// 		if (!isFound) {
			// 		// 		this.base.getView().mAggregations.content[0].mAggregations.sections[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mBindingInfos.items.binding.aContexts[i].delete()
			// 		// 		}
						


			// 		// }
			// 		// var oUploadSet = this.byId("uploadSet");
			// 		// oUploadSet.removeAllIncompleteItems();
			// 		// oUploadSet.getBinding("items").refresh();
			// 		// this.base.getView().mAggregations.content[0].mAggregations.sections[1].getBindingContext().refresh()
			// 		// this.getView().getContent()[0].getSections()[1].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().mAggregations.items[1].mBindingInfos.items.binding.refresh
			// 		sap.ui.getCore().byId("project1::parentObjectPage--fe::CustomSubSection::Attachment--uploadSet").mBindingInfos.items.binding.refresh();

			// 	},
			// 	onBeforeSave: async function (oEvent) {
			// 		debugger;
			// 		var allItems = this.base.getView().mAggregations.content[0].mAggregations.sections[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mAggregations.items
			// 		var ocacheItemscache = this.base.getView().mAggregations.content[0].mAggregations.sections[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mBindingInfos.items.binding.oCache.aElements.$byPredicate
			// 		var obitems = this.base.getView().mAggregations.content[0].mAggregations.sections[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mBindingInfos.items.binding.oCache.aElements.$byPredicate

			// 		var valuesArraycache = Object.values(obitems);

			// 		// this.base.getView().mAggregations.content[0].mAggregations.sections[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mBindingInfos.items.binding.aContexts[0].delete()
			// 		for (var i = 0; i < valuesArraycache.length; i++) {
			// 			debugger;
			// 			var isFound = false; 
			// 			for (var j = 0; j < allItems.length; j++) {
			// 				debugger
			// 				var url =allItems[j].mProperties.url
			// 				// Regular expression to match the ID
			// 				var regex = /ID=([a-f\d-]+)/i;

			// 				// Extract the ID using the regular expression
			// 				var match = url.match(regex);
			// 				if (valuesArraycache[i].ID === match[1]) {
			// 					isFound = true; 

			// 					break;
			// 				}
			// 			}
							
			// 				if (!isFound) {
			// 				this.base.getView().mAggregations.content[0].mAggregations.sections[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.items[1].mBindingInfos.items.binding.aContexts[i].delete()
			// 				}
						


			// 		}

			// 	}

			// },

			routing: {
				onBeforeBinding: async function (oBindingContext) {
					debugger;
					// sap.ui.getCore().byId("project1::parentObjectPage--fe::CustomSubSection::Attachment--uploadSet").mBindingInfos.items.binding.refresh();
				}
			},

		}
	});
});
