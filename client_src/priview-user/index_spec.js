describe("blog:priview-user", function() {
	var element, scope, isolatedScope, user, pubDate;


    beforeEach(angular.mock.module('blog'));
    

    beforeEach(inject(function($rootScope, $compile){
		user = {
			_id: "585eb5ec48fd8416040fea41",
			name: "Роман Черношей",
			vk_id: "6477085",
			vk_profile: "http://vk.com/id6477085",
			photo_uri: "https://pp.vk.me/c417816/v417816085/d8b6/ILq82lXS49w.jpg",
			created: "2016-12-24T17:52:44.438Z",
			__v: 0
		};

		pubDate = "2016-12-24T17:52:44.438Z";

		parentScope = $rootScope.$new();
		parentScope.user = user;
		parentScope.pubDate = pubDate;
		
		element = angular.element("<priview-user" +
									" user=\"user\"" +
									" pub-date=\"pubDate\"" +
									" add-class=\"'article__user'\"" +
									"></priview-user>");

		element = $compile(element)(parentScope);

		parentScope.$digest();

    }));

	it("should be link", function () {

		expect(findIn(element, '.priview-user__user-link')).toBeDefined();
	});


    it("should be same name", function() {		

		expect(user.name).toBe(findIn(element, '.priview-user__user-link').text());
    });

	it("should not be link", function () {

		parentScope.user.vk_profile = null;
		parentScope.$digest();

		expect(findIn(element, '.priview-user__user-link').length).toBe(0);
	});

});