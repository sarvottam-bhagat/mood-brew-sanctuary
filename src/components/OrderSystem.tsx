import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  CreditCard, 
  MapPin,
  Clock,
  Trash2,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customizations: string[];
  size: string;
  milk: string;
  temperature: string;
}

interface OrderSystemProps {
  cartItems: CartItem[];
  onUpdateCart: (items: CartItem[]) => void;
  selectedTable?: string;
}

const customizationOptions = {
  sizes: [
    { name: "Small", price: 0 },
    { name: "Medium", price: 1.00 },
    { name: "Large", price: 2.00 }
  ],
  milkTypes: [
    "Regular", "Oat", "Almond", "Soy", "Coconut", "Macadamia"
  ],
  temperatures: [
    "Hot", "Iced", "Extra Hot", "Luke Warm"
  ],
  extras: [
    { name: "Extra Shot", price: 1.50 },
    { name: "Decaf", price: 0 },
    { name: "Sugar Free Syrup", price: 0.50 },
    { name: "Extra Foam", price: 0 },
    { name: "Whipped Cream", price: 1.00 }
  ]
};

export function OrderSystem({ cartItems, onUpdateCart, selectedTable }: OrderSystemProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { toast } = useToast();

  const updateQuantity = (id: string, change: number) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean) as CartItem[];
    
    onUpdateCart(updatedItems);
  };

  const removeItem = (id: string) => {
    onUpdateCart(cartItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const basePrice = item.price;
      const sizeUpcharge = customizationOptions.sizes.find(s => s.name === item.size)?.price || 0;
      const extrasPrice = item.customizations.reduce((sum, extra) => {
        const extraOption = customizationOptions.extras.find(e => e.name === extra);
        return sum + (extraOption?.price || 0);
      }, 0);
      return total + ((basePrice + sizeUpcharge + extrasPrice) * item.quantity);
    }, 0);
  };

  const processPayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setOrderComplete(true);
      setShowCheckout(false);
      onUpdateCart([]);
      toast({
        title: "Order Confirmed! 🎉",
        description: `Your order has been placed. Estimated time: 8-12 minutes`,
      });
    }, 2000);
  };

  if (orderComplete) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl font-display text-green-600">
            Order Confirmed!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            Your coffee is being crafted with love
          </p>
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>Estimated time: 8-12 minutes</span>
            </div>
            {selectedTable && (
              <div className="flex items-center justify-center space-x-2 text-sm mt-2">
                <MapPin className="h-4 w-4" />
                <span>Delivering to: {selectedTable}</span>
              </div>
            )}
          </div>
          <Button 
            onClick={() => setOrderComplete(false)}
            variant="outline" 
            className="w-full"
          >
            Order Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showCheckout) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-display">Checkout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Order Summary */}
          <div className="space-y-3">
            <h3 className="font-semibold">Order Summary</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name} ({item.size})</span>
                <span>${((item.price + (customizationOptions.sizes.find(s => s.name === item.size)?.price || 0)) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          {/* Delivery Info */}
          {selectedTable && (
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">Delivering to: {selectedTable}</span>
              </div>
            </div>
          )}

          {/* Payment Method */}
          <div className="space-y-3">
            <Label>Payment Method</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={paymentMethod === "card" ? "default" : "outline"}
                onClick={() => setPaymentMethod("card")}
                className="h-12"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Card
              </Button>
              <Button
                variant={paymentMethod === "loyalty" ? "default" : "outline"}
                onClick={() => setPaymentMethod("loyalty")}
                className="h-12"
              >
                Points
              </Button>
            </div>
          </div>

          {/* Mock Payment Form */}
          {paymentMethod === "card" && (
            <div className="space-y-3">
              <div>
                <Label>Card Number</Label>
                <Input placeholder="4242 4242 4242 4242" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Expiry</Label>
                  <Input placeholder="12/27" />
                </div>
                <div>
                  <Label>CVC</Label>
                  <Input placeholder="123" />
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setShowCheckout(false)}
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              onClick={processPayment}
              className="flex-1"
              variant="premium"
            >
              Pay ${calculateTotal().toFixed(2)}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center py-8">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground">Add some coffee to get started!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-display flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6" />
          <span>Your Order</span>
          <Badge>{cartItems.length} items</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.size} • {item.milk} • {item.temperature}
                </p>
                {item.customizations.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.customizations.map((custom) => (
                      <Badge key={custom} variant="outline" className="text-xs">
                        {custom}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, -1)}
                  className="h-8 w-8"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="font-medium w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, 1)}
                  className="h-8 w-8"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  ${((item.price + (customizationOptions.sizes.find(s => s.name === item.size)?.price || 0)) * item.quantity).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">
                  ${(item.price + (customizationOptions.sizes.find(s => s.name === item.size)?.price || 0)).toFixed(2)} each
                </div>
              </div>
            </div>
          </div>
        ))}

        <Separator />
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold text-primary">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>
          
          {selectedTable && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Delivering to: {selectedTable}</span>
            </div>
          )}
          
          <Button 
            onClick={() => setShowCheckout(true)}
            className="w-full"
            size="lg"
            variant="premium"
          >
            Proceed to Checkout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}