<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Vehicle extends Model implements JWTSubject
{
    use HasFactory;

    protected $fillable = [
        'placa',
        'color',
        'marca',
        'tipo',
        'conductor_id',
        'propietario_id'
    ];

    public function conductor()
    {
        return $this->belongsTo(User::class, 'conductor_id');
    }

    public function propietario()
    {
        return $this->belongsTo(User::class, 'propietario_id');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
