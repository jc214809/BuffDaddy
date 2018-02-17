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
    it('checkForExercise returns FALSE when Exercise in NOT present', function() {
      scope.workoutExercises = [
        { "exerciseId": 24, "exerciseName": "1", "arms": true, "back": false, "chest": false, "core": false, "legs": false, "shoulders": false, "cardio": false, "$$hashKey": "object:139" }
      ]
      expect(scope.checkForExercise(10)).toEqual(false);
    });
    it('checkForExercise returns TRUE when Exercise IS present', function() {
      scope.workoutExercises = [
        { "exerciseId": 24, "exerciseName": "1", "arms": true, "back": false, "chest": false, "core": false, "legs": false, "shoulders": false, "cardio": false, "$$hashKey": "object:139" }
      ]
      expect(scope.checkForExercise(24)).toEqual(true);
    });
    it('countSetsOfExercise returns correct number of sets', function() {
      var the1stSet = { "setId": 2190, "workoutId": 134, "exerciseId": 37 };
      var the2ndSet = { "setId": 2190, "workoutId": 134, "exerciseId": 100 };
      var the3rdSet = { "setId": 2190, "workoutId": 134, "exerciseId": 12 };
      scope.sets = [
        { "setId": 2190, "workoutId": 134, "exerciseId": 37, "sortId": 0, "exerciseName": "Squat Machine", "weight": "360", "reps": "8", "time": null, "distance": null, "calories": null, "heartRate": null, "stairs": null, "steps": null, "level": null, "incline": null, "strokes": null, "speed": null, "$$hashKey": "object:153" },
        { "setId": 2189, "workoutId": 134, "exerciseId": 37, "sortId": 0, "exerciseName": "Squat Machine", "weight": "340", "reps": "10", "time": null, "distance": null, "calories": null, "heartRate": null, "stairs": null, "steps": null, "level": null, "incline": null, "strokes": null, "speed": null, "$$hashKey": "object:152" },
        { "setId": 2188, "workoutId": 134, "exerciseId": 37, "sortId": 0, "exerciseName": "Squat Machine", "weight": "320", "reps": "10", "time": null, "distance": null, "calories": null, "heartRate": null, "stairs": null, "steps": null, "level": null, "incline": null, "strokes": null, "speed": null, "$$hashKey": "object:151" },
        { "setId": 2191, "workoutId": 134, "exerciseId": 37, "sortId": 0, "exerciseName": "Squat Machine", "weight": "380", "reps": "8", "time": null, "distance": null, "calories": null, "heartRate": null, "stairs": null, "steps": null, "level": null, "incline": null, "strokes": null, "speed": null, "$$hashKey": "object:154" },
        { "setId": 2209, "workoutId": 134, "exerciseId": 12, "sortId": 0, "exerciseName": "Leg Curls", "weight": "155", "reps": "15", "time": null, "distance": null, "calories": null, "heartRate": null, "stairs": null, "steps": null, "level": null, "incline": null, "strokes": null, "speed": null, "$$hashKey": "object:169" }
      ]
      expect(scope.countSetsOfExercise(the1stSet)).toEqual(4);
      expect(scope.countSetsOfExercise(the2ndSet)).toEqual(0);
      expect(scope.countSetsOfExercise(the3rdSet)).toEqual(1);
    });
    it('checkForSets returns TRUE is already part of Sets', function() {
      scope.sets = [
        { "setId": 2190, "workoutId": 134, "exerciseId": 37, "sortId": 0, "exerciseName": "Squat Machine", "weight": "360", "reps": "8", "time": null, "distance": null, "calories": null, "heartRate": null, "stairs": null, "steps": null, "level": null, "incline": null, "strokes": null, "speed": null, "$$hashKey": "object:153" }
      ]
      expect(scope.checkForSets(2190)).toEqual(true);
    });
    it('checkForSets returns FALSE if it is not part of Sets', function() {
      scope.sets = [
        { "setId": 2190, "workoutId": 134, "exerciseId": 37, "sortId": 0, "exerciseName": "Squat Machine", "weight": "360", "reps": "8", "time": null, "distance": null, "calories": null, "heartRate": null, "stairs": null, "steps": null, "level": null, "incline": null, "strokes": null, "speed": null, "$$hashKey": "object:153" }
      ]
      expect(scope.checkForSets(2191)).toEqual(false);
    });

  });
});