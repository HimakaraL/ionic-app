<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;

//Register
Route::post("register",[ApiController::class,"register"]);

//Login
Route::post("login",[ApiController::class,"login"]);

//profile
Route::group([
    "middleware" => ["auth:sanctum"]
],function(){
    Route::get("profile",[ApiController::class,"profile"]);

    Route::put("editProfile",[ApiController::class, "editProfile"]);

    Route::delete("deleteProfile",[ApiController::class, "deleteProfile"]);
    
    Route::post("logout",[ApiController::class,"logout"]);
});

// Catch-all route for Vue Router
Route::get('/{any}', function () {
    return view('welcome'); 
})->where('any', '.*');