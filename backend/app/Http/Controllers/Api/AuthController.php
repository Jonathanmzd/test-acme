<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required|confirmed",
            "role" => "required|in:Conductor,Propietario"
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "message" => "Error de validacion",
                "errors" => $validator->errors()
            ], 422);
        }

        try {
            User::create([
                "name" => $request->name,
                "email" => $request->email,
                "password" => Hash::make($request->password),
                "role" => $request->role
            ]);

            return response()->json([
                "status" => true,
                "message" => "Usuario Registrado correctamente"
            ]);
        } catch (\Exception $e) {
            Log::error("Auth Register: " . $e->getMessage());
        }
    }

    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error de validacion',
                    'errors' => $validator->errors()
                ], 422);
            }

            $token = JWTAuth::attempt([
                "email" => $request->email,
                "password" => $request->password
            ]);

            if (!empty($token)) {
                return response()->json([
                    "status" => true,
                    "message" => "Usuario Autenticado Correctamente",
                    "token" => $token
                ]);
            }

            return response()->json([
                "status" => false,
                "message" => "Credenciales Invalidas"
            ]);
        } catch (\Exception $e) {
            Log::error("Auth Login: " . $e->getMessage());
        }
    }

    public function profile(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                "token" => "required"
            ]);

            if ($validator->fails()) {
                return response()->json([
                    "status" => false,
                    "message" => "Error de Validacion",
                    "errors" => $validator->errors()
                ], 422);
            }

            $userdata = auth()->user();

            return response()->json([
                "status" => true,
                "message" => "Datos del Perfil",
                "data" => $userdata
            ]);
        } catch (\Exception $e) {
            Log::error("Auth Profile: " . $e->getMessage());
        }
    }

    public function refreshToken(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                "token" => "required"
            ]);

            if ($validator->fails()) {
                return response()->json([
                    "status" => false,
                    "message" => "Error de Validacion",
                    "errors" => $validator->errors()
                ], 422);
            }

            $newToken = auth()->refresh();

            return response()->json([
                "status" => true,
                "message" => "Nuevo acceso al token",
                "token" => $newToken
            ]);
        } catch (\Exception $e) {
            Log::error("Auth Refresh Token: " . $e->getMessage());
        }
    }

    public function logout(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                "token" => "required"
            ]);

            if ($validator->fails()) {
                return response()->json([
                    "status" => false,
                    "message" => "Error de Validacion",
                    "errors" => $validator->errors()
                ], 422);
            }

            auth()->logout();

            return response()->json([
                "status" => true,
                "message" => "El usuario cerró sesión exitosamente"
            ]);
        } catch (\Exception $e) {
            Log::error("Auth Logout: " . $e->getMessage());
        }
    }
}
