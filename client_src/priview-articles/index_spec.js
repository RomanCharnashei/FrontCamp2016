describe("blog:priview-articles", function() {
	var element, parentScope, userProfileSvc;


    beforeEach(angular.mock.module('blog'));
	beforeEach(function(){
		angular.mock.module(function ($provide, $controllerProvider) {
			$provide.service('userProfile', function () {

				this.get = sinon.stub().returns({
					_id: "585eb5ec48fd8416040fea41",
					name: "Роман Черношей",
					vk_id: "6477085",
					vk_profile: "http://vk.com/id6477085",
					photo_uri: "https://pp.vk.me/c417816/v417816085/d8b6/ILq82lXS49w.jpg",
					created: "2016-12-24T17:52:44.438Z",
					__v: 0
				});

			});
		});
	});

    beforeEach(inject(function($rootScope, $compile){

		var articles = [{
			_id: "585eb5ec48fd8416040fea42",
			title: "Politics",
			preview: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil qui, earum adipisci culpa consectetur hic necessitatibus tenetur quod itaque vel voluptatum at, recusandae rerum, quaerat sint dignissimos totam minima ipsam quibusdam. Quos dolorum, facere autem officia perferendis culpa. Iusto nemo vitae ullam sunt magni corporis eveniet, magnam, et culpa obcaecati.",
			pubDate: "2016-12-24T17:52:44.438Z",
			_user: {
				_id: "585eb5ec48fd8416040fea41",
				name: "Роман Черношей",
				vk_id: "6477085",
				vk_profile: "http://vk.com/id6477085",
				photo_uri: "https://pp.vk.me/c417816/v417816085/d8b6/ILq82lXS49w.jpg",
				created: "2016-12-24T17:52:44.438Z",
				__v: 0
			}
		},	{
				_id: "585eb5ec48fd8416040fea43",
				title: "Economy",
				preview: "Test Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil qui, earum adipisci culpa consectetur hic necessitatibus tenetur quod itaque vel voluptatum at, recusandae rerum, quaerat sint dignissimos totam minima ipsam quibusdam. Quos dolorum, facere autem officia perferendis culpa. Iusto nemo vitae ullam sunt magni corporis eveniet, magnam, et culpa obcaecati.",
				pubDate: "2016-12-24T17:52:44.438Z",
				_user: {
					_id: "585eb5ec48fd8416040fea41",
					name: "Роман Черношей",
					vk_id: "6477085",
					vk_profile: "http://vk.com/id6477085",
					photo_uri: "https://pp.vk.me/c417816/v417816085/d8b6/ILq82lXS49w.jpg",
					created: "2016-12-24T17:52:44.438Z",
					__v: 0
				}
			}];
		
		parentScope = $rootScope.$new();
		parentScope.articles = articles;
		element = angular.element("<priview-articles></priview-articles>");
		element = $compile(element)(parentScope);
		parentScope.$digest();
    }));

	it("should be link", function () {

		expect(true).toBe(true);
	});
});