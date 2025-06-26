// src/components/ProductForm.tsx

import { Formik, Form, Field, FormikHelpers } from "formik";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

interface ProductFormValues {
  BARCODE: string;
  ITEM: string;
  SIZE: string;
  PRICE: string;
  STOCK: string;
  UNIT: string;
}

const initialValues: ProductFormValues = {
  BARCODE: "",
  ITEM: "",
  SIZE: "",
  PRICE: "",
  STOCK: "",
  UNIT: "",
};

const webhookUrl = import.meta.env.N8N_WEBHOOK_URL;

export default function ProductForm() {
  useEffect(() => {
    console.log(webhookUrl);
  }, []);
  const handleSubmit = async (
    values: ProductFormValues,
    { resetForm }: FormikHelpers<ProductFormValues>
  ) => {
    try {
      await axios.post(webhookUrl, values);
      alert("Product submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit product.");
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="space-y-4">
            {Object.keys(initialValues).map((key) => {
              const field = key as keyof ProductFormValues;
              const isNumeric = field === "PRICE" || field === "STOCK";

              return (
                <div key={field}>
                  <Label htmlFor={field}>{field}</Label>
                  <Field
                    as={Input}
                    name={field}
                    id={field}
                    placeholder={`Enter ${field}`}
                    type={isNumeric ? "number" : "text"}
                  />
                </div>
              );
            })}

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
}
