# BuildUnix Marketing Website

The official, high-fidelity marketing platform for BuildUnix, featuring interactive 3D urban visualizations and a token-driven design system.

## 🚀 Key Features

- **Interactive 3D Community**: A real-time 3D visualization of urban environments built with `@react-three/fiber`.
- **Dynamic Building Visualization**: Interactive building models with real-time labeling and raycasting.
- **Token-Driven Design**: A robust styling system using CSS Variables (Tokens) for consistent branding.
- **SEO Optimized**: Pre-configured metadata and SEO best practices for all marketing pages.
- **GSAP Animations**: Fluid, high-performance UI transitions and 3D scene orchestrations.

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **3D Engine**: [Three.js](https://threejs.org/) with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Animation**: [GSAP](https://greensock.com/gsap/) & [SplitType](https://github.com/lukebit/split-type)
- **Styling**: Vanilla CSS with [CSS Modules](https://github.com/css-modules/css-modules)
- **Visual Assets**: Custom 3D materials and shaders.

## 📂 Project Structure

```text
├── app/               # Next.js App Router pages and layouts
├── components/        # Reusable UI and 3D components
│   ├── buildunix-community/  # 3D Community Scene components
│   ├── buildunix-building/   # 3D Building Scene components
│   └── contact/              # Contact page specific UI
├── public/            # Static assets (3D models, images, brand)
├── lib/               # Utilities, SEO helpers, and site content
└── scripts/           # Maintenance and automation scripts
```

## 🛠️ Getting Started

1.  **Clone and Install**:
    ```bash
    npm install
    ```

2.  **Development**:
    ```bash
    npm run dev
    ```

3.  **Build**:
    ```bash
    npm run build
    ```

## 🤝 Contributing

This repository follows an atomic commit strategy. Please ensure your commits are small, logical, and focused on a single change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
