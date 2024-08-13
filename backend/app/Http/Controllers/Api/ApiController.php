<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class ApiController extends Controller
{
    public function register(Request $request)
    {
        try 
        {
            $validateUser = Validator::make($request->all(),
            [
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'password' => 'required',
                'status' => 'required',
                'phone_no' => 'required'
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message'=> 'Validation Error',
                    'errors' => $validateUser->errors()
                ],401);
            }

            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'status' => $request->status,
                'phone_no' => $request->phone_no,
            ]);

            // Generate a token for the user
            $token = $user->createToken("API TOKEN")->plainTextToken;

            // Update the user with the token
            $user->token = $token;
            $user->save();

            return response()->json([
                'status' => true,
                'message' => 'User registered successfully',
                'token' => $token
            ],201);

        } catch (Throwable $th) {
            return response()->json([
                'status' => false,
                'message'=> $th->getMessage(),
            ],500);
        }
        
    }

    public function login(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(),
            [
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message'=> 'Validation Error',
                    'errors' => $validateUser->errors()
                ],401);
            }

            if(!Auth::attempt($request->only(['email', 'password']))){
                return response()->json([
                    'status' => false,
                    'message'=> 'Email & Password does not match!',
                ],401);
            }

            $user = User::where('email',$request->email)->first();
            return response()->json([
                'status' => true,
                'message'=> 'Logged in successfuly!',
                'token' => $user->createToken("API TOKEN")->plainTextToken,
            ],201);
            
        } catch (Throwable $th) {
            return response()->json([
                'status' => false,
                'message'=> $th->getMessage(),
            ],500);
        }

    }

    public function profile(){
        $userData = auth()->user();
        return response()->json([
            'status' => true,
            'message'=> 'Profile Loaded',
            'data' => $userData,
            'id' => auth()->user()->id
        ],201);
    }

    public function editProfile(Request $request){
        $userData = auth()->user();
        $userData->update($request->all());

        return response()->json([
            'status' => true,
            'message'=> 'User updated successfully!',
            'data' => $userData,
        ],201);
    }

    public function deleteProfile(){
        $userData = auth()->user();
        $userData->delete();

        return response()->json([
            'status' => true,
            'message'=> 'User deleted successfully!',
        ],201);
    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => true,
            'message'=> 'User logout successfully!',
        ],201);
    }
}