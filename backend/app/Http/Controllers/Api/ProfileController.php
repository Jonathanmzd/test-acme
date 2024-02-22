<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function index()
    {
        try {
            $profiles = User::select('users.id as id_user', 'users.*', 'profiles.*')
                ->leftJoin('profiles', 'users.id', '=', 'profiles.user_id')
                ->get();
            return response()->json([
                'status' => true,
                'data' => $profiles
            ]);
        } catch (\Exception $e) {
            Log::error("Profile Index: " . $e->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $profile = Profile::findOrFail($id);
            return response()->json([
                'status' => true,
                'data' => $profile
            ]);
        } catch (\Exception $e) {
            Log::error("Profile Show: " . $e->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
            $requestData = $request->all();

            $validator = Validator::make($requestData, [
                'user_id' => 'required|exists:users,id',
                'cedula' => 'nullable|string',
                'primer_nombre' => 'required|string',
                'segundo_nombre' => 'nullable|string',
                'apellidos' => 'required|string',
                'direccion' => 'nullable|string',
                'telefono' => 'nullable|string',
                'ciudad' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error de validacion',
                    'errors' => $validator->errors()
                ], 422);
            }

            $profile = Profile::create($requestData);
            return response()->json([
                'status' => true,
                'message' => 'Perfil creado exitosamente',
                'data' => $profile
            ], 201);
        } catch (\Exception $e) {
            Log::error("Profile Store: " . $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $profile = Profile::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'cedula' => 'nullable|string',
                'primer_nombre' => 'required|string',
                'segundo_nombre' => 'nullable|string',
                'apellidos' => 'required|string',
                'direccion' => 'nullable|string',
                'telefono' => 'nullable|string',
                'ciudad' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error de validacion',
                    'errors' => $validator->errors()
                ], 422);
            }

            $profile->update($request->all());
            return response()->json([
                'status' => true,
                'message' => 'Perfil actualizado con éxito',
                'data' => $profile
            ]);
        } catch (\Exception $e) {
            Log::error("Profile Update: " . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $profile = Profile::findOrFail($id);
            $profile->delete();
            return response()->json([
                'status' => true,
                'message' => 'Perfil eliminado con éxito',
            ]);
        } catch (\Exception $e) {
            Log::error("Profile Destroy: " . $e->getMessage());
        }
    }
}
