// "use client";

// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { fetchCategories } from "@/actions/admin/categories/fetch-categories";
// import { editCategory } from "@/actions/admin/categories/edit-categories";
// import { saveCategory } from "@/actions/admin/categories/save-categories";
// import { deleteCategory } from "@/actions/admin/categories/delete-categories";
// import { CategoryList } from "./category-list";
// import { CategoryFormDialog } from "./category-dialog";

// export const AdminCategories = () => {
//   const [categories, setCategories] = useState<{ id: string }[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const fetchAllCategories = async () => {
//     setIsLoading(true);
//     try {
//       const data = await fetchCategories();
//       setCategories(data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       toast.error("Failed to fetch categories.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // @ts-expect-error ignore
//   const handleSaveCategory = async (categoryData) => {
//     setIsSubmitting(true);
//     try {
//       if (editingCategory) {
//         // @ts-expect-error ignore
//         await editCategory(editingCategory.id, categoryData);
//         toast.success("Category updated successfully!");
//       } else {
//         await saveCategory(categoryData);
//         toast.success("Category created successfully!");
//       }
//       // Fetch the latest categories immediately after saving or editing
//       await fetchAllCategories();
//       setIsDialogOpen(false);
//       setEditingCategory(null);
//     } catch (error) {
//       console.error("Error saving category:", error);
//       toast.error("Failed to save category.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   // @ts-expect-error ignore
//   const handleDeleteCategory = async (categoryId) => {
//     try {
//       await deleteCategory(categoryId);
//       toast.success("Category deleted successfully!");
//       // Fetch the latest categories immediately after deletion
//       await fetchAllCategories();
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       toast.error("Failed to delete category.");
//     }
//   };

//   useEffect(() => {
//     fetchAllCategories();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <header className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Manage Categories</h1>
//         <Button
//           className="bg-blue-600 text-white"
//           onClick={() => {
//             setEditingCategory(null);
//             setIsDialogOpen(true);
//           }}
//         >
//           Add New Category
//         </Button>
//       </header>

//       {/* Category List */}
//       <CategoryList
//         // @ts-expect-error ignore
//         categories={categories}
//         isLoading={isLoading}
//         onEdit={(category) => {
//           // @ts-expect-error ignore
//           setEditingCategory(category);
//           setIsDialogOpen(true);
//         }}
//         onDelete={handleDeleteCategory}
//       />

//       {/* Add/Edit Category Dialog */}
//       <CategoryFormDialog
//         isOpen={isDialogOpen}
//         onClose={() => setIsDialogOpen(false)}
//         onSave={handleSaveCategory}
//         // @ts-expect-error ignore
//         category={editingCategory}
//         isSubmitting={isSubmitting}
//       />
//     </div>
//   );
// };


"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { fetchCategories } from "@/actions/admin/categories/fetch-categories";
import { editCategory } from "@/actions/admin/categories/edit-categories";
import { saveCategory } from "@/actions/admin/categories/save-categories";
import { deleteCategory } from "@/actions/admin/categories/delete-categories";
import { CategoryList } from "./category-list";
import { CategoryFormDialog } from "./category-dialog";

interface Category {
  id: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchAllCategories = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCategories() as Category[];
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCategory = async (categoryData: { name: string; description: string }) => {
    setIsSubmitting(true);
    try {
      if (editingCategory) {
        await editCategory(editingCategory.id, { ...editingCategory, ...categoryData });
        toast.success("Category updated successfully!");
      } else {
        await saveCategory({ id: '', ...categoryData });
        toast.success("Category created successfully!");
      }
      await fetchAllCategories();
      setIsDialogOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("Failed to save category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId);
      toast.success("Category deleted successfully!");
      await fetchAllCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category.");
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header with Black Bar */}
      <header className="relative w-full">
        <div className="flex justify-between items-center bg-black text-white rounded-md p-6">
          <h1 className="text-3xl font-bold">Manage Categories</h1>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => {
              setEditingCategory(null);
              setIsDialogOpen(true);
            }}
          >
            Add New Category
          </Button>
        </div>
      </header>

      {/* Search Input */}
      <div className="my-4 flex justify-start">
        <input
          type="text"
          placeholder="Search Categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-72 px-4 py-2 border rounded-md"
        />
      </div>

      {/* Filtered Category List */}
      <CategoryList
        categories={categories.filter((category) =>
          category.name.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        isLoading={isLoading}
        onEdit={(category) => {
          setEditingCategory(category);
          setIsDialogOpen(true);
        }}
        onDelete={handleDeleteCategory}
      />

      {/* Add/Edit Category Dialog */}
      <CategoryFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveCategory}
        category={editingCategory ? { name: editingCategory.name, description: editingCategory.description } : undefined}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
