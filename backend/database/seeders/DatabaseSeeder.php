<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Compte administrateur
        User::create([
            'name' => 'Admin LocalShop',
            'email' => 'admin@localshop.test',
            'password' => Hash::make('password'),
            'is_admin' => true,
        ]);

        // Compte client
        User::create([
            'name' => 'Client Test',
            'email' => 'client@localshop.test',
            'password' => Hash::make('password'),
            'is_admin' => false,
        ]);

        // Produits de démonstration
        $products = [
            [
                'name' => 'Casque Bluetooth',
                'slug' => 'casque-bluetooth',
                'description' => 'Casque sans fil avec une bonne autonomie et un son clair.',
                'price' => 25000,
                'stock' => 15,
                'is_visible' => true,
                'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
            ],
            [
                'name' => 'Clavier mécanique',
                'slug' => 'clavier-mecanique',
                'description' => 'Clavier mécanique confortable pour le travail et le jeu.',
                'price' => 45000,
                'stock' => 8,
                'is_visible' => true,
                'image' => 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600',
            ],
            [
                'name' => 'Souris gaming',
                'slug' => 'souris-gaming',
                'description' => 'Souris précise avec plusieurs boutons programmables.',
                'price' => 18000,
                'stock' => 20,
                'is_visible' => true,
                'image' => 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600',
            ],
            [
                'name' => 'Écouteurs sans fil',
                'slug' => 'ecouteurs-sans-fil',
                'description' => 'Écouteurs compacts avec une bonne isolation.',
                'price' => 15000,
                'stock' => 12,
                'is_visible' => false,
                'image' => 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600',
            ],
            [
                'name' => 'Webcam HD',
                'slug' => 'webcam-hd',
                'description' => 'Webcam Full HD pour les visioconférences.',
                'price' => 32000,
                'stock' => 6,
                'is_visible' => true,
                'image' => 'https://picsum.photos/seed/webcam/600/400',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}