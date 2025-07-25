import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Wifi, MapPin, Clock, CheckCircle, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Table {
  id: string;
  number: string;
  section: string;
  capacity: number;
  available: boolean;
  nfcId: string;
  ambience: string;
}

const mockTables: Table[] = [
  { id: "t1", number: "A1", section: "Reading Sanctuary", capacity: 2, available: true, nfcId: "NFC001", ambience: "Quiet & Cozy" },
  { id: "t2", number: "A2", section: "Reading Sanctuary", capacity: 4, available: false, nfcId: "NFC002", ambience: "Quiet & Cozy" },
  { id: "t3", number: "B1", section: "Rhythm Lounge", capacity: 2, available: true, nfcId: "NFC003", ambience: "Upbeat & Energetic" },
  { id: "t4", number: "B2", section: "Rhythm Lounge", capacity: 6, available: true, nfcId: "NFC004", ambience: "Upbeat & Energetic" },
  { id: "t5", number: "C1", section: "Nature Nook", capacity: 2, available: false, nfcId: "NFC005", ambience: "Fresh & Natural" },
  { id: "t6", number: "C2", section: "Nature Nook", capacity: 4, available: true, nfcId: "NFC006", ambience: "Fresh & Natural" },
  { id: "t7", number: "D1", section: "Innovation Lab", capacity: 1, available: true, nfcId: "NFC007", ambience: "Focus & Productivity" },
  { id: "t8", number: "D2", section: "Innovation Lab", capacity: 2, available: true, nfcId: "NFC008", ambience: "Focus & Productivity" },
];

interface SmartTableServiceProps {
  selectedTable: string | null;
  onTableSelect: (table: Table) => void;
  orderStatus?: 'none' | 'preparing' | 'ready' | 'delivered';
}

export function SmartTableService({ selectedTable, onTableSelect, orderStatus = 'none' }: SmartTableServiceProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedTable, setScannedTable] = useState<Table | null>(null);
  const { toast } = useToast();

  const simulateNFCScan = () => {
    setIsScanning(true);
    
    // Simulate NFC scan delay
    setTimeout(() => {
      const availableTables = mockTables.filter(t => t.available);
      const randomTable = availableTables[Math.floor(Math.random() * availableTables.length)];
      
      setScannedTable(randomTable);
      setIsScanning(false);
      
      toast({
        title: "NFC Tag Detected! 📱",
        description: `Scanned table ${randomTable.number} in ${randomTable.section}`,
      });
    }, 2000);
  };

  const confirmTableSelection = (table: Table) => {
    onTableSelect(table);
    setScannedTable(null);
    toast({
      title: "Table Reserved! 🪑",
      description: `You're now seated at table ${table.number}. Your orders will be delivered here automatically.`,
    });
  };

  const renderOrderStatus = () => {
    if (!selectedTable || orderStatus === 'none') return null;

    const statusConfig = {
      preparing: {
        icon: Clock,
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        text: "Your order is being prepared..."
      },
      ready: {
        icon: CheckCircle,
        color: "text-blue-600", 
        bg: "bg-blue-50",
        text: "Your order is ready! Our staff is bringing it to your table."
      },
      delivered: {
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-green-50", 
        text: "Order delivered! Enjoy your coffee experience."
      }
    };

    const config = statusConfig[orderStatus];
    const StatusIcon = config.icon;

    return (
      <Card className={`${config.bg} border-current`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <StatusIcon className={`h-6 w-6 ${config.color}`} />
            <div>
              <p className={`font-medium ${config.color}`}>
                {config.text}
              </p>
              <p className="text-sm text-muted-foreground">
                Table {selectedTable} • Smart delivery in progress
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-display font-semibold text-foreground">
          Smart Table Service
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Tap your phone on any table's NFC tag to automatically register your seat. 
          Your orders will be delivered directly to your table without any hassle.
        </p>
      </div>

      {renderOrderStatus()}

      {/* Current Table Display */}
      {selectedTable && (
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 rounded-full p-3">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Currently Seated</h3>
                  <p className="text-primary-foreground/80">
                    Table {selectedTable} • Auto-delivery active
                  </p>
                </div>
              </div>
              <Badge className="bg-green-500 text-white">
                <Wifi className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* NFC Scanner */}
      <Card className="border-dashed border-2 border-accent">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className={`rounded-full p-6 ${isScanning ? 'bg-accent animate-pulse' : 'bg-accent/20'}`}>
                <Smartphone className={`h-12 w-12 ${isScanning ? 'text-white' : 'text-accent'}`} />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {isScanning ? "Scanning for NFC tag..." : "Tap to scan table NFC"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {isScanning 
                  ? "Hold your phone near the table's NFC tag"
                  : "Simulate scanning an NFC tag on any available table"
                }
              </p>
            </div>

            <Button
              onClick={simulateNFCScan}
              disabled={isScanning}
              variant="premium"
              size="lg"
              className="w-full max-w-xs"
            >
              {isScanning ? "Scanning..." : "Simulate NFC Scan"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scanned Table Confirmation */}
      {scannedTable && (
        <Card className="border-accent shadow-glow">
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <span>Table Detected!</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Table Number</p>
                <p className="font-semibold text-lg">{scannedTable.number}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Section</p>
                <p className="font-semibold">{scannedTable.section}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Capacity</p>
                <p className="font-semibold">{scannedTable.capacity} people</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ambience</p>
                <p className="font-semibold">{scannedTable.ambience}</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                onClick={() => confirmTableSelection(scannedTable)}
                variant="premium"
                className="flex-1"
              >
                Confirm & Sit Here
              </Button>
              <Button
                onClick={() => setScannedTable(null)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Tables Map */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-display">Available Tables</CardTitle>
          <p className="text-muted-foreground">Or manually select a table to reserve</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTables.map((table) => (
              <Card
                key={table.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  !table.available ? 'opacity-50' : 'hover:shadow-mood'
                } ${selectedTable === table.number ? 'ring-2 ring-accent' : ''}`}
                onClick={() => table.available && confirmTableSelection(table)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-lg">Table {table.number}</h4>
                    <Badge variant={table.available ? "default" : "destructive"}>
                      {table.available ? "Available" : "Occupied"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{table.section}</p>
                    <p>{table.ambience}</p>
                    <div className="flex items-center space-x-2">
                      <User className="h-3 w-3" />
                      <span>Up to {table.capacity} people</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}