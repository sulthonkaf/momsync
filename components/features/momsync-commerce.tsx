"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ShoppingCart, Star, Zap } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Prenatal Vitamin Bundle",
    category: "Supplements",
    price: 29.99,
    rating: 4.8,
    reviews: 342,
    image: "prenatal-vitamins",
    recommended: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Anti-Stunting Nutrition Pack",
    category: "Nutrition",
    price: 49.99,
    rating: 4.9,
    reviews: 156,
    image: "nutrition-pack",
    recommended: true,
    inStock: true,
  },
  {
    id: 3,
    name: "Maternity Pillow",
    category: "Comfort",
    price: 59.99,
    rating: 4.7,
    reviews: 289,
    image: "maternity-pillow",
    recommended: false,
    inStock: true,
  },
  {
    id: 4,
    name: "Baby Care Essentials Kit",
    category: "Baby Care",
    price: 79.99,
    rating: 4.6,
    reviews: 198,
    image: "baby-kit",
    recommended: false,
    inStock: true,
  },
  {
    id: 5,
    name: "Organic Baby Formula",
    category: "Nutrition",
    price: 34.99,
    rating: 4.8,
    reviews: 421,
    image: "baby-formula",
    recommended: true,
    inStock: false,
  },
  {
    id: 6,
    name: "Breast Pump (Electric)",
    category: "Postpartum",
    price: 149.99,
    rating: 4.9,
    reviews: 567,
    image: "breast-pump",
    recommended: false,
    inStock: true,
  },
]

const categories = ["All", "Supplements", "Nutrition", "Comfort", "Baby Care", "Postpartum"]

export default function MomSyncCommerce() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cart, setCart] = useState<number[]>([])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleCart = (productId: number) => {
    setCart((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>MomSync Commerce</CardTitle>
          <CardDescription>Curated products for maternal health and baby care</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory !== cat ? "bg-transparent" : ""}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="bg-muted h-40 flex items-center justify-center relative">
                  <span className="text-muted-foreground">{product.image}</span>
                  {product.recommended && (
                    <Badge className="absolute top-2 right-2 gap-1">
                      <Zap className="h-3 w-3" />
                      Recommended
                    </Badge>
                  )}
                </div>

                <div className="p-4">
                  <p className="font-semibold text-sm mb-1">{product.name}</p>
                  <p className="text-xs text-muted-foreground mb-2">{product.category}</p>

                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <p className="font-bold text-lg">${product.price}</p>
                    <Badge variant={product.inStock ? "default" : "secondary"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>

                  <Button
                    className="w-full"
                    disabled={!product.inStock}
                    onClick={() => toggleCart(product.id)}
                    variant={cart.includes(product.id) ? "default" : "outline"}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {cart.includes(product.id) ? "In Cart" : "Add to Cart"}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {cart.length > 0 && (
            <div className="fixed bottom-6 right-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
              <p className="font-semibold">{cart.length} items in cart</p>
              <Button className="mt-2 w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Checkout
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
