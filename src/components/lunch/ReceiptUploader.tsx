
import React, { useState } from 'react';
import { Upload, Receipt, FileUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { LunchLocation, Order } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ReceiptUploaderProps {
  location: LunchLocation;
  orders: Order[];
  onReceiptProcessed: (orders: Order[]) => void;
}

const ReceiptUploader = ({ location, orders, onReceiptProcessed }: ReceiptUploaderProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedOrders, setProcessedOrders] = useState<Order[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };
  
  const processReceipt = () => {
    if (!selectedImage) {
      toast.error("Selecteer eerst een kasticket afbeelding");
      return;
    }
    
    setIsProcessing(true);
    
    // In a real app, this would send the image to a backend OCR service
    // For demo purposes, we'll simulate processing with random prices
    setTimeout(() => {
      // Simulate receipt processing by assigning random prices to orders
      const updatedOrders = orders.map(order => ({
        ...order,
        amount: parseFloat((Math.random() * 10 + 5).toFixed(2)), // Random price between €5 and €15
        isPaid: false
      }));
      
      setProcessedOrders(updatedOrders);
      setIsProcessing(false);
      setShowResults(true);
      
      toast.success("Kasticket is verwerkt!", { 
        description: "De bestellingen zijn gekoppeld aan de bedragen." 
      });
    }, 2000);
  };
  
  const confirmAndClose = () => {
    onReceiptProcessed(processedOrders);
    setShowResults(false);
    setSelectedImage(null);
  };
  
  const totalAmount = processedOrders.reduce((sum, order) => sum + (order.amount || 0), 0);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-euricom hover:bg-euricom-dark">
          <Receipt className="h-4 w-4 mr-2" />
          Kasticket uploaden
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Kasticket uploaden</DialogTitle>
          <DialogDescription>
            Upload een foto van je kasticket om automatisch te berekenen wie jou welk bedrag verschuldigd is.
          </DialogDescription>
        </DialogHeader>
        
        {!showResults ? (
          <>
            <div className="space-y-4 py-4">
              {selectedImage ? (
                <div className="mt-2 relative">
                  <img 
                    src={URL.createObjectURL(selectedImage)} 
                    alt="Geselecteerd kasticket" 
                    className="w-full h-auto max-h-64 object-contain rounded-md border border-gray-200" 
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2 bg-white"
                    onClick={() => setSelectedImage(null)}
                  >
                    Wijzigen
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center">
                  <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-4">
                    Klik om een foto van je kasticket te uploaden
                  </p>
                  <Input
                    id="receipt-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => document.getElementById('receipt-upload')?.click()}
                  >
                    <FileUp className="h-4 w-4 mr-2" />
                    Kies bestand
                  </Button>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setSelectedImage(null)}
                disabled={!selectedImage || isProcessing}
              >
                Annuleren
              </Button>
              <Button 
                className="bg-euricom hover:bg-euricom-dark"
                onClick={processReceipt}
                disabled={!selectedImage || isProcessing}
              >
                {isProcessing ? 'Verwerken...' : 'Verwerken'}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="py-4">
              <h3 className="font-medium mb-3">Overzicht verschuldigde bedragen</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Collega</TableHead>
                    <TableHead className="text-right">Bedrag</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.userName}</TableCell>
                      <TableCell className="text-right font-medium">€{order.amount?.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="font-bold">Totaal</TableCell>
                    <TableCell className="text-right font-bold">€{totalAmount.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <DialogFooter>
              <Button 
                className="bg-euricom hover:bg-euricom-dark"
                onClick={confirmAndClose}
              >
                Bevestigen
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptUploader;
