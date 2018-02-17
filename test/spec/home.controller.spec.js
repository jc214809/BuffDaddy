describe('Home Controller', function() {

  var controller;

  var scope;

  beforeEach(module('app'));
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('HomeController', {
      '$scope': scope
    });
  }));

  describe('Test the Home controller', function() {
    it('Width of inputs is correct', function() {
      scope.setWidth(1);
      expect(scope.size).toEqual("88.2%");
      scope.setWidth(2);
      expect(scope.size).toEqual("44.125%");
      scope.setWidth(3);
      expect(scope.size).toEqual("29.41%");
      scope.setWidth(4);
      expect(scope.size).toEqual("22.25%");
      scope.setWidth(0);
      expect(scope.size).toEqual("13%");
      scope.setWidth(99);
      expect(scope.size).toEqual("13%");
    });
    it('Workout Title is Core', function() {
      scope.workoutExercises = [
        { "exerciseId": 24, "exerciseName": "Ab X Machine", "recommendation": null, "exerciseDescription": null, "sortId": 893, "image": null, "weight": false, "reps": true, "time": false, "distance": false, "calories": false, "heartRate": false, "stairs": false, "steps": false, "level": false, "incline": false, "strokes": false, "speed": false, "socialId": null, "arms": false, "back": false, "chest": false, "core": true, "legs": false, "shoulders": false, "cardio": false, "$$hashKey": "object:139" },
        { "exerciseId": 8, "exerciseName": "Crunch", "recommendation": null, "exerciseDescription": null, "sortId": 894, "image": null, "weight": false, "reps": true, "time": false, "distance": false, "calories": false, "heartRate": false, "stairs": false, "steps": false, "level": false, "incline": false, "strokes": false, "speed": false, "socialId": null, "arms": false, "back": false, "chest": false, "core": true, "legs": false, "shoulders": false, "cardio": false, "$$hashKey": "object:140" },
        { "exerciseId": 5, "exerciseName": "Cable Crunch", "recommendation": null, "exerciseDescription": null, "sortId": 895, "image": null, "weight": true, "reps": true, "time": false, "distance": false, "calories": false, "heartRate": false, "stairs": false, "steps": false, "level": false, "incline": false, "strokes": false, "speed": false, "socialId": null, "arms": false, "back": false, "chest": false, "core": true, "legs": false, "shoulders": false, "cardio": false, "$$hashKey": "object:141" },
        { "exerciseId": 62, "exerciseName": "Crunch - Hands Overhead", "recommendation": null, "exerciseDescription": null, "sortId": 896, "image": null, "weight": false, "reps": true, "time": false, "distance": false, "calories": false, "heartRate": false, "stairs": false, "steps": false, "level": false, "incline": false, "strokes": false, "speed": false, "socialId": null, "arms": false, "back": false, "chest": false, "core": true, "legs": false, "shoulders": false, "cardio": false, "$$hashKey": "object:142" }
      ]
      scope.getWorkoutTitle();
      expect(scope.workoutTitle).toEqual("Core");
    });
    it('Workout Title is Core & Cardio', function() {
      scope.workoutExercises = [
        { "exerciseId": 24, "exerciseName": "Ab X Machine", "recommendation": null, "exerciseDescription": null, "sortId": 893, "image": null, "weight": false, "reps": true, "time": false, "distance": false, "calories": false, "heartRate": false, "stairs": false, "steps": false, "level": false, "incline": false, "strokes": false, "speed": false, "socialId": null, "arms": false, "back": false, "chest": false, "core": true, "legs": false, "shoulders": false, "cardio": false, "$$hashKey": "object:139" },
        { "exerciseId": 8, "exerciseName": "Crunch", "recommendation": null, "exerciseDescription": null, "sortId": 894, "image": null, "weight": false, "reps": true, "time": false, "distance": false, "calories": false, "heartRate": false, "stairs": false, "steps": false, "level": false, "incline": false, "strokes": false, "speed": false, "socialId": null, "arms": false, "back": false, "chest": false, "core": true, "legs": false, "shoulders": false, "cardio": false, "$$hashKey": "object:140" },
        { "exerciseId": 5, "exerciseName": "Cable Crunch", "recommendation": null, "exerciseDescription": null, "sortId": 895, "image": null, "weight": true, "reps": true, "time": false, "distance": false, "calories": false, "heartRate": false, "stairs": false, "steps": false, "level": false, "incline": false, "strokes": false, "speed": false, "socialId": null, "arms": false, "back": false, "chest": false, "core": true, "legs": false, "shoulders": false, "cardio": false, "$$hashKey": "object:141" },
        { "exerciseId": 62, "exerciseName": "Crunch - Hands Overhead", "recommendation": null, "exerciseDescription": null, "sortId": 896, "image": null, "weight": false, "reps": true, "time": false, "distance": false, "calories": false, "heartRate": false, "stairs": false, "steps": false, "level": false, "incline": false, "strokes": false, "speed": false, "socialId": null, "arms": false, "back": false, "chest": false, "core": false, "legs": false, "shoulders": false, "cardio": true, "$$hashKey": "object:142" }
      ]
      scope.getWorkoutTitle();
      expect(scope.workoutTitle).toEqual("Core & Cardio");
    });
    it('Workout Title is Cardio less than 25%', function() {
      scope.workoutExercises = [
        { "exerciseId": 24, "exerciseName": "Ab X Machine", "recommendation": null, "exerciseDescription": null, "sortId": 893, "image": null, "weight": false, "reps": true, "time": false, "distance": false, "calories": false, "heartRate": false, "stairs": false, "steps": false, "level": false, "incline": false, "strokes": false, "speed": false, "socialId": null, "arms": false, "back": false, "chest": false, "core": true, "legs": false, "shoulders": false, "cardio": false, "$$hashKey": "object:139" },
        { "exerciseId": 8, "exerciseName": "Crunch", "recommendation": null, "exerciseDescription": null, "sortId": 894, "image": null, "weight": false, "reps": true, "time": false, "distance": false, "calories": false, "heartRate": false, "stairs": false, "steps": false, "level": false, "incline": false, "strokes": false, "speed": false, "socialId": null, "arms": false, "back": false, "chest": false, "core": true, "legs": false, "shoulders": false, "cardio": false, "$$hashKey": "object:140" },
        { "exerciseId": 5, "exerciseName": "Cable Crunch", "recommendation": null, "exerciseDescription": null, "sortId": 895, "image": null, "weight": true, "reps": true, "time": false, "distance": false, "calories": false, "heartRate": false, "stairs": false, "steps": false, "level": false, "incline": false, "strokes": false, "speed": false, "socialId": null, "arms": false, "back": false, "chest": false, "core": true, "legs": false, "shoulders": false, "cardio": false, "$$hashKey": "object:141" },
        { "exerciseId": 62, "exerciseName": "Crunch - Hands Overhead", "recommendation": null, "exerciseDescription": null, "sortId": 896, "image": null, "weight": false, "reps": true, "time": false, "distance": false, "calories": false, "heartRate": false, "stairs": false, "steps": false, "level": false, "incline": false, "strokes": false, "speed": false, "socialId": null, "arms": false, "back": false, "chest": false, "core": true, "legs": false, "shoulders": false, "cardio": false, "$$hashKey": "object:142" },
        { "exerciseId": 62, "exerciseName": "Crunch - Hands Overhead", "recommendation": null, "exerciseDescription": null, "sortId": 896, "image": null, "weight": false, "reps": true, "time": false, "distance": false, "calories": false, "heartRate": false, "stairs": false, "steps": false, "level": false, "incline": false, "strokes": false, "speed": false, "socialId": null, "arms": false, "back": false, "chest": false, "core": false, "legs": false, "shoulders": false, "cardio": true, "$$hashKey": "object:142" }
      ]
      scope.getWorkoutTitle();
      expect(scope.workoutTitle).toEqual("Core");
    });
    it('Workout Title Total Body', function() {
      scope.workoutExercises = [
        { "exerciseId": 24, "exerciseName": "1", "arms": true, "back": false, "chest": false, "core": false, "legs": false, "shoulders": false, "cardio": false, "$$hashKey": "object:139" },
        { "exerciseId": 34, "exerciseName": "1", "arms": false, "back": true, "chest": false, "core": false, "legs": false, "shoulders": false, "cardio": false, "$$hashKey": "object:139" },
        { "exerciseId": 54, "exerciseName": "1", "arms": false, "back": false, "chest": true, "core": false, "legs": false, "shoulders": false, "cardio": false, "$$hashKey": "object:139" },
        { "exerciseId": 554, "exerciseName": "1", "arms": false, "back": false, "chest": false, "core": true, "legs": false, "shoulders": false, "cardio": false, "$$hashKey": "object:139" },
        { "exerciseId": 2554, "exerciseName": "1", "arms": false, "back": false, "chest": false, "core": false, "legs": true, "shoulders": false, "cardio": false, "$$hashKey": "object:139" },
        { "exerciseId": 255554, "exerciseName": "1", "arms": false, "back": false, "chest": false, "core": false, "legs": true, "shoulders": true, "cardio": false, "$$hashKey": "object:139" }
      ]
      scope.getWorkoutTitle();
      expect(scope.workoutTitle).toEqual("Legs, Shoulders, Core, Chest, Back & Arms");
    });

  });
});