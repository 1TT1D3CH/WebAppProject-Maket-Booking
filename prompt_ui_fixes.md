# Task: Refactor and Enhance UX/UI for Market Stall Booking System (Admin Builder)

You are tasked with improving the UX/UI of the React/Web application for the **Dynamic Market Stall Booking System (Admin Builder view)** based on the attached screenshot analysis.

---

## 💡 Objective
Improve visual contrast, streamline the top toolbar navigation, enhance canvas interaction feedback, and standardize button hierarchies to create a professional, accessible, and intuitive editing environment for market administrators.

---

## 🎨 UI & Design Guidelines

### 1. Color Palette & Accessibility Refinements
- **Text Contrast on Stall Cards:**
  - Increase contrast for small text inside stall cards (e.g., dimensions like `2.5x2m`, `3x2.3m`).
  - Change the dimension text color from muted cyan/blue to a high-contrast soft grey (`#E2E8F0` / `text-slate-200`) or bright neutral shade so it remains readable over dark stall backgrounds.
- **Status Indicators (Stall Badges):**
  - Ensure status tags (`ว่าง` / Available, `จองแล้ว` / Booked, `ปิดบริการ` / Maintenance) maintain high contrast with readable font weights (`font-medium` or `font-semibold`).

---

## 🛠️ Component Refactoring Instructions

### 2. Top Header & Toolbar Restructuring
- **Separate System Info from Editing Tools:**
  - Split the top bar into two clear functional rows or groups:
    1. **Global Header:** App Title (`Test`), Database Status (`Firestore Online`), Mode Switcher (`Admin Builder` / `Customer Map`), Profile/Notifications.
    2. **Canvas Toolbar:** Action buttons specifically for editing the map (`30x20m.`, `จัดการโซน`, `เพิ่มแผง`, `บันทึกผัง`).
- **Button Visual Hierarchy:**
  - **Primary Action (`บันทึกผัง` / Save Layout):** Highlight using a solid primary color accent with clear visual dominance.
  - **Secondary Actions (`เพิ่มแผง`, `จัดการโซน`, etc.):** Convert to subtle/outlined button styles or ghost buttons to prevent visual noise.
- **Summary Metrics Counter:**
  - Update top status summary (`ทั้งหมด`, `ว่าง`, `จองแล้ว`) to include **`ปิดบริการ` (Disabled/Maintenance)** count so all current stall states are accounted for.

---

### 3. Canvas & Stall Card Interactivity (UX)
- **Active State & Resize Handles:**
  - Add explicit selected state UI for stall cards on the canvas when clicked (e.g., bright border outline, transform controls / corner resize handles, rotate/delete floating action buttons).
- **Grid Navigation & Layout Helper:**
  - Keep the `Snap 0.5m` indicator clean and accessible.
  - Optional: Prepare a floating mini-map or canvas zoom/pan indicator at the bottom corner for large market layouts.

---

## 📝 Implementation Tasks Checklist

- [ ] Update dimension text styles inside `StallCard` component for better contrast.
- [ ] Refactor `Navbar` / `Header` layout into separate primary header and editing toolbar components.
- [ ] Adjust button visual weights (Primary for Save, Ghost/Outline for secondary utilities).
- [ ] Add `Disabled/Closed` count to the market summary status bar.
- [ ] Implement active selection border/handles on the interactive Stall Canvas items.

Please apply these UI adjustments directly to the codebase while preserving the existing dark mode aesthetic and layout dimensions.