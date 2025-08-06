// Filter.jsx
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

const categories = [
  { id: "Next JS", label: "Next JS" },
  { id: "Data Science", label: "Data Science" },
  { id: "Frontend Development", label: "Frontend Development" },
  { id: "Fullstack Development", label: "Fullstack Development" },
  { id: "MERN Stack Development", label: "MERN Stack Development" },
  { id: "Backend Development", label: "Backend Development" },
  { id: "Javascript", label: "Javascript" },
  { id: "Python", label: "Python" },
  { id: "Docker", label: "Docker" },
  { id: "MongoDB", label: "MongoDB" },
  { id: "HTML", label: "HTML" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];

      handleFilterChange(newCategories, sortByPrice);
      return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  };

  return (
    <div className="w-full md:w-64 bg-white dark:bg-[#16213E] p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-lg text-[#2D3748] dark:text-[#E2E8F0]">
          Filter Options
        </h1>
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger className="w-[140px] border-[#537D5D] focus:ring-[#537D5D]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-[#16213E] border-[#537D5D]">
            <SelectGroup>
              <SelectLabel className="text-[#537D5D] dark:text-[#6B8E71]">
                Sort by price
              </SelectLabel>
              <SelectItem 
                value="low" 
                className="focus:bg-[#F0F7F4] dark:focus:bg-[#2D3748]"
              >
                Low to High
              </SelectItem>
              <SelectItem 
                value="high"
                className="focus:bg-[#F0F7F4] dark:focus:bg-[#2D3748]"
              >
                High to Low
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <Separator className="my-4 bg-[#E2E8F0] dark:bg-[#2D3748]" />
      
      <div>
        <h1 className="font-semibold text-[#2D3748] dark:text-[#E2E8F0] mb-3">
          CATEGORY
        </h1>
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-3">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
                className="border-[#537D5D] data-[state=checked]:bg-[#537D5D]"
              />
              <Label 
                htmlFor={category.id} 
                className="text-[#4A5568] dark:text-[#A0AEC0]"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;