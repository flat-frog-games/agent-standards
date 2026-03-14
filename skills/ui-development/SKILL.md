---
name: UI Development
description: Godot UI architecture best practices, MVC/MVP implementations, Storybook UI gallery testing, and blind AI collaboration workflows.
---
# Godot UI Best Practices & AI Workflow Guide

Developing scalable User Interfaces in Godot requires discipline, as the engine's node-based architecture makes it very easy to accidentally tightly couple your visual UI elements directly to your core game logic.

This document outlines industry best practices for structuring Godot UIs, as well as workflows for how we can collaborate effectively on UI tasks despite the AI's lack of native "live" vision of the game.

---

## 1. Architectural Best Practices for Godot UI

### A. The "Dumb View" Pattern (MVC / MVP)
The absolute golden rule of Game UI is that **the UI should never hold or calculate game state**. It should be a "dumb view" that only knows how to display data provided to it, and how to tell the game when a button is clicked.

*   **Model (Data):** Use custom Godot `Resource` scripts or `Autoloads` (Globals) to hold your game data (e.g., PlayerHealth, CurrentWave, Resources).
*   **View (UI):** The Godot `Control` nodes. These scripts should *only* contain logic for animating themselves or updating text/progress bars.
*   **Controller/Presenter:** The UI node should connect to Signals emitted by the Model. 
    *   *Example:* `PlayerHealth` emits a `health_changed(new_value)` signal. The `HealthBarUI.gd` script listens to this signal and updates its `TextureProgressBar.value`. It never directly queries the player node.

### B. The Centralized Theme System
Godot has a powerful `Theme` system that acts like CSS for the web.
*   Never manually set the Font, Color, or StyleBox on an individual label or button within a scene.
*   Instead, create a central `.theme` asset file. Assign this theme to your root UI node.
*   **For the Artist:** This allows the artist to open *one single file*, change the font size or the default button hover texture, and have it immediately roll out across the entire game without needing to open or break any `.tscn` files.

### C. Componentization (The "Lego" Approach)
Do not build monolithic screens (e.g., making one massive `PauseMenu.tscn` where every button is built from scratch).
*   Build reusable, atomic components: `PrimaryButton.tscn`, `IconLabel.tscn`, `ResourcePanel.tscn`.
*   Build your larger screens by instancing these atomic scenes. This ensures consistency and makes sweeping changes much easier.

---

## 2. AI Collaboration Workflows (When the Agent is "Blind")

As an AI, I cannot boot up the game and look at the screen live. However, because of how Godot works, we have several powerful workflows we can leverage to collaborate seamlessly on UI:

### A. The "Storybook" Pattern (UI Showcase Gallery)
In web development, "Storybook" is an app that renders UI components in total isolation so designers can see them without playing the game. We can replicate this easily in Godot!

*   **The Workflow:** We create a dedicated internal scene called `ui_gallery.tscn`. This scene does nothing but instantiate every single generic UI component (a button, a panel, a health bar) in a grid, totally disconnected from the actual game.
*   **How I Help:** You can launch just `ui_gallery.tscn` and take a single screenshot showing all our UI components in their default, hovered, and disabled states. You send me that screenshot, and I can immediately assess typography, alignment, and color consistency across your entire design system at once.

### B. Leveraging My Vision Capabilities (Screenshots & Mockups)
I *do* have vision capabilities when you attach images to your prompts! 
*   **Design Critiques:** You can attach a screenshot of the game or a mockup from your artist. I can analyze the UX hierarchy, identify accessibility/contrast issues, and suggest spacing/layout improvements.
*   **Visual Debugging:** If a UI element looks stretched or misaligned, send me a screenshot of it alongside a screenshot of your Godot Scene Tree hierarchy.

### C. Reading the Matrix (JSON / .tscn Files)
Because Godot scene files (`.tscn`) are just plain text, I can actually "see" your UI mathematically!
*   If you say "The pause menu buttons are overlapping," I don't technically need to see it. I can use my tools to read `pause_menu.tscn`.
*   I can mathematically analyze the `anchors`, `margins`, `size_flags`, and `VBoxContainer` overrides directly in the text file to tell you exactly which flag is set incorrectly and fix the code for you.
