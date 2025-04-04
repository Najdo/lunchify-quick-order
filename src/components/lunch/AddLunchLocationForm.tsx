
import React from 'react';
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  locationName: z.string().min(2, {
    message: "Locatie naam moet tenminste 2 karakters bevatten.",
  }),
  menuUrl: z.string().url({
    message: "Voer een geldige URL in of laat leeg",
  }).optional().or(z.literal('')),
  myOrder: z.string().min(2, {
    message: "Bestelling moet tenminste 2 karakters bevatten.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const AddLunchLocationForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      locationName: "",
      menuUrl: "",
      myOrder: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // In a real app, this would save to a database
    console.log('Lunch location added:', data);
    
    // Mock saving the data - would be replaced with an API call
    toast.success(`Lunch locatie ${data.locationName} toegevoegd`, {
      description: "Je collega's kunnen nu hun bestelling plaatsen."
    });
    
    // Reset form
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full bg-white shadow-md hover:bg-gray-50">
          <Plus className="h-5 w-5 text-euricom" />
          <span className="sr-only">Voeg lunch locatie toe</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lunch locatie toevoegen</DialogTitle>
          <DialogDescription>
            Laat je collega's weten waar je vandaag lunch gaat halen.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="locationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Locatie naam</FormLabel>
                  <FormControl>
                    <Input placeholder="Broodjeszaak De Lunch" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="menuUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Menu URL (optioneel)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/menu" {...field} />
                  </FormControl>
                  <FormDescription>
                    Voeg een link toe naar het menu van de locatie.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="myOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mijn bestelling</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Broodje gezond met extra kaas..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Geef aan wat jij gaat bestellen.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="bg-euricom hover:bg-euricom-dark">Toevoegen</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLunchLocationForm;
