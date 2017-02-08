describe("blog:article-creator", function() {
	var element, parentScope, controller, form;


    beforeEach(angular.mock.module('blog'));
    

    beforeEach(inject(function($rootScope, $compile) {
		parentScope = $rootScope.$new();
		element = angular.element("<article-creator></article-creator>");
		element = $compile(element)(parentScope);		
		controller = element.controller('articleCreator');
		controller.article = {
			title: "test",
			content: "teeeeeeeeeeeeeeeeest"
		};
		parentScope.$digest();
		form = controller.articleForm;
    }));

	it("should be valid form", function () {

		expect(form.$valid).toBeTruthy();
	});

	it("should be invalid form with empty title", function () {

		expect(form.$valid).toBeTruthy();
		form.title.$setViewValue("");
		parentScope.$digest();
		expect(form.$valid).toBeFalsy();
		expect(form.title.$valid).toBeFalsy();
	});

	it("should be invalid form with empty content", function () {

		expect(form.$valid).toBeTruthy();
		form.content.$setViewValue("");
		parentScope.$digest();
		expect(form.$valid).toBeFalsy();
		expect(form.content.$valid).toBeFalsy();
	});

	it("should be invalid form with less than 20 length of content ", function () {

		expect(form.$valid).toBeTruthy();
		form.content.$setViewValue("safdfdsf");
		parentScope.$digest();
		expect(form.$valid).toBeFalsy();
		expect(form.content.$valid).toBeFalsy();
	});
});