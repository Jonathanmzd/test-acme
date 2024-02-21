<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'cedula',
        'primer_nombre',
        'segundo_nombre',
        'apellidos',
        'direccion',
        'telefono',
        'ciudad'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
