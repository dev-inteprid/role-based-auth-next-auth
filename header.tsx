"use client";
import React from "react";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import PermissionCheck from "@/components/permission-check";

const Header = () => {
  const router = useRouter();

  const onClick = () => {
    return router.push("/products/create");
  };

  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Products</h2>
        <p className="text-muted-foreground">Manage your products</p>
      </div>
      <div className="flex items-center space-x-2">
        <PermissionCheck permission="products.create">
          <Button onClick={onClick}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add product
          </Button>
        </PermissionCheck>
      </div>
    </div>
  );
};

export default Header;
