<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vehicle;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class VehicleController extends Controller
{
    public function index()
    {
        try {
            $vehicles = Vehicle::all();
            foreach ($vehicles as $vehicle) {
                if ($vehicle->conductor_id) {
                    $vehicle->conductor->profile;
                }
                if ($vehicle->propietario_id) {
                    $vehicle->propietario->profile;
                }
            }
            return response()->json([
                'status' => true,
                'data' => $vehicles
            ]);
        } catch (\Exception $e) {
            Log::error("Vehicle Index: " . $e->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $vehicle = Vehicle::findOrFail($id);
            return response()->json([
                'status' => true,
                'data' => $vehicle
            ]);
        } catch (\Exception $e) {
            Log::error("Vehicle Show: " . $e->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'placa' => 'required|string',
                'color' => 'required|string',
                'marca' => 'required|string',
                'tipo' => 'required|in:particular,publico',
                'conductor_id' => 'required|exists:users,id',
                'propietario_id' => 'required|exists:users,id'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error de validacion',
                    'errors' => $validator->errors()
                ], 422);
            }

            $vehicle = Vehicle::create($request->all());
            return response()->json([
                'status' => true,
                'message' => 'Vehiculo creado Correctamente',
                'data' => $vehicle
            ], 201);
        } catch (\Exception $e) {
            Log::error("Vehicle Store: " . $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $vehicle = Vehicle::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'placa' => 'required|string',
                'color' => 'required|string',
                'marca' => 'required|string',
                'tipo' => 'required|in:particular,publico',
                'conductor_id' => 'required|exists:users,id',
                'propietario_id' => 'required|exists:users,id'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error de validacion',
                    'errors' => $validator->errors()
                ], 422);
            }

            $vehicle->update($request->all());
            return response()->json([
                'status' => true,
                'message' => 'Vehiculo actualizado correctamente',
                'data' => $vehicle
            ]);
        } catch (\Exception $e) {
            Log::error("Vehicle Update: " . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $vehicle = Vehicle::findOrFail($id);
            $vehicle->delete();
            return response()->json([
                'status' => true,
                'message' => 'Vehiculo eliminado correctamente'
            ]);
        } catch (\Exception $e) {
            Log::error("Vehicle Destroy: " . $e->getMessage());
        }
    }
}
