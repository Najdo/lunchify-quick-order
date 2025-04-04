
import React, { useState } from 'react';
import { Upload, FileText, FileUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { LunchLocation, MenuLocationItem } from '@/lib/types';

interface MenuUploaderProps {
  location: LunchLocation;
  onMenuProcessed: (menuItems: MenuLocationItem[]) => void;
}

const MenuUploader = ({ location, onMenuProcessed }: MenuUploaderProps) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setSelectedImages(prev => [...prev, ...fileArray]);
    }
  };
  
  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const processMenuImages = () => {
    if (selectedImages.length === 0) {
      toast.error("Selecteer eerst menukaart afbeeldingen");
      return;
    }
    
    setIsProcessing(true);
    
    // In a real app, this would send the images to a backend OCR service
    // For demo purposes, we'll simulate processing with mock menu items
    setTimeout(() => {
      // Simulate menu item extraction
      const mockMenuItems: MenuLocationItem[] = [
        { id: '1', name: 'Kaas & Ham', price: 4.50, description: 'Broodje met kaas en ham' },
        { id: '2', name: 'Club Sandwich', price: 6.50, description: 'Met kip, spek, sla, tomaat en ei' },
        { id: '3', name: 'Tonijnsalade', price: 5.50, description: 'Huisgemaakte tonijnsalade' },
        { id: '4', name: 'Gezond', price: 5.00, description: 'Met kaas, ham, ei, sla en groenten' },
        { id: '5', name: 'Carpaccio', price: 7.50, description: 'Met Parmezaanse kaas en pijnboompitten' },
        { id: '6', name: 'Veggie Deluxe', price: 5.50, description: 'Met hummus en gegrilde groenten' },
        { id: '7', name: 'Soep van de dag', price: 3.50 },
        { id: '8', name: 'Frisdrank', price: 2.50 }
      ];
      
      onMenuProcessed(mockMenuItems);
      setIsProcessing(false);
      
      toast.success("Menu is verwerkt!", { 
        description: `${mockMenuItems.length} menu-items gedetecteerd en toegevoegd voor autocomplete.` 
      });
      
      // Close the dialog
      setSelectedImages([]);
    }, 2000);
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-euricom hover:bg-euricom-dark">
          <FileText className="h-4 w-4 mr-2" />
          Menu kaart inscannen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Menu kaart inscannen</DialogTitle>
          <DialogDescription>
            Upload foto's van het menu om automatisch items te extraheren voor autocomplete bij het bestellen.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {selectedImages.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt={`Menu afbeelding ${index+1}`} 
                    className="w-full h-24 object-cover rounded-md border border-gray-200" 
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-1 right-1 bg-white h-6 w-6 p-0"
                    onClick={() => removeImage(index)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 mb-4">
              Upload foto's van het menu
            </p>
            <Input
              id="menu-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="hidden"
            />
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('menu-upload')?.click()}
            >
              <FileUp className="h-4 w-4 mr-2" />
              Kies bestanden
            </Button>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" disabled={isProcessing}>
            Annuleren
          </Button>
          <Button 
            className="bg-euricom hover:bg-euricom-dark"
            onClick={processMenuImages}
            disabled={selectedImages.length === 0 || isProcessing}
          >
            {isProcessing ? 'Verwerken...' : 'Verwerken'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MenuUploader;
