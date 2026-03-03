# **Hub Map GH**
**Ghana Tech Ecosystem Directory**

Hub Map GH is the definitive community-maintained directory of co-working spaces, incubators, accelerators, and makerspaces across Ghana. It helps users find the nearest tech hub using an interactive map and AI-powered recommendations.

> 🌐 **Live:** [hubmapgh.vercel.app](https://hubmapgh.vercel.app)

---

## **🎯 Project Overview**
Hub Map GH enables users to:
- **Discover** tech hubs across Ghana on an interactive map.
- **Search** using natural language powered by Google Gemini Pro.
- **Share** hub information to any app using the Web Share API.
- **Manage** hub data through a secure admin dashboard.

---

## **✨ Key Features**

### **1. Interactive Map (Leaflet)**
- Full map of Ghana with markers for every registered tech hub.
- Click-to-view hub details with distance calculations.

### **2. AI Matching (Gemini Pro)**
- Natural language search for hubs (e.g., "Find me a maker space near Kumasi").
- IP-based AI usage limits (3/day) for sustainability within free tiers.

### **3. Admin Console**
- Secure dashboard to approve community submissions and manage hub metadata.
- Firebase Auth-protected access.

### **4. Performance**
- Multi-layer caching (Memory + Firestore Metadata) for sub-50ms map loads.
- Optimized data fetching with server-side caching layer.

### **5. V2 Improvements**
- AI Matching with Gemini Pro.
- Native sharing via Web Share API.
- Admin console for community submissions.
- Performance: Multi-layer caching for sub-50ms map loads.

---

## **🛠️ Tech Stack**

| **Component**        | **Technology** |
|----------------------|----------------|
| Core Framework       | Next.js 14 (App Router) |
| Database             | Firebase Firestore |
| Authentication       | Firebase Auth |
| AI Engine            | Google Gemini Pro |
| Styling              | Tailwind CSS (Glassmorphism) |
| Map Engine           | Leaflet |
| Testing              | Vitest |

---

## **🗂️ Project Structure**

```
├── src/
│   ├── app/
│   │   ├── admin/      ← Admin Dashboard & Login
│   │   ├── api/        ← Serverless API routes (AI, Hubs, Admin)
│   │   └── page.tsx    ← Main Map & Recommender interface
│   ├── components/
│   │   ├── AIRecommender.tsx  ← Gemini-powered search
│   │   ├── HubCard.tsx        ← Shared & Native Share API
│   │   └── ConfirmModal.tsx   ← Custom premium dialogs
│   ├── context/
│   │   └── AuthContext.tsx    ← Firebase User state
│   ├── lib/
│   │   ├── firebase.ts ← DB, Auth, and Analytics init
│   │   └── cache.ts    ← Server-side performance layer
│   └── test/           ← Vitest test suite
```

---

## **👤 Author**
Built by Ernest Kojo Owusu Essien — Software Engineer, Accra 🇬🇭
Data is community-maintained and verified by the Hub Map GH Admin team.
