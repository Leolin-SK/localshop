<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ProductApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_un_visiteur_peut_lister_les_produits_visibles(): void
    {
        Product::create([
            'name' => 'Produit visible',
            'slug' => 'produit-visible',
            'description' => 'Test',
            'price' => 10000,
            'stock' => 5,
            'is_visible' => true,
        ]);

        Product::create([
            'name' => 'Produit cache',
            'slug' => 'produit-cache',
            'description' => 'Test',
            'price' => 5000,
            'stock' => 2,
            'is_visible' => false,
        ]);

        $response = $this->getJson('/api/products');

        $response->assertStatus(200);
        $response->assertJsonCount(1);
    }

    public function test_impossible_de_creer_un_produit_sans_nom(): void
    {
        $admin = User::create([
            'name' => 'Admin Test',
            'email' => 'admin-test@localshop.test',
            'password' => Hash::make('password'),
            'is_admin' => true,
        ]);

        $token = $admin->createToken('test')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/admin/products', [
                'price' => 15000,
                'stock' => 3,
                'is_visible' => true,
            ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name']);
    }
}