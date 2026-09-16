<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::where('is_visible', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($products);
    }

    public function show(Product $product)
    {
        if (!$product->is_visible) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        return response()->json($product);
    }
}