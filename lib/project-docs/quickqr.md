# **QuickQR (QR Code Generator)**
**Upload files, get shareable QR codes, and track views.**

QuickQR is a full-stack file sharing application that lets users upload files, generate QR codes for instant sharing, and track view counts. Built with Next.js, NextAuth, and Firebase.

---

## **🎯 Project Overview**
QuickQR enables users to:
- **Upload** files (up to 10MB) via drag-and-drop or file picker.
- **Generate** QR codes that link directly to uploaded files.
- **Track** view counts — each scan increments the counter.
- **Manage** uploads through a personal admin dashboard.

---

## **✨ Key Features**

### **1. User Accounts**
- Sign up and sign in with email/password or Google OAuth.
- Each user only sees and manages their own uploads (private documents).

### **2. File Upload**
- Drag-and-drop or file picker interface.
- Files up to 10MB supported.
- Files stored in Firebase Storage with metadata in Firestore.

### **3. QR Code Generation**
- Instant QR code creation for any uploaded file.
- QR codes link directly to the file's shareable URL.

### **4. View Tracking**
- Each QR code scan increments a view counter.
- View counts visible in the admin dashboard.

### **5. Admin Dashboard**
- Personal dashboard to view uploads, view counts, and create QR codes.
- Super Admin mode (optional) — configurable list of emails can access `/admin/super` for system-level management.

---

## **🛠️ Tech Stack**

| **Component**        | **Technology** |
|----------------------|----------------|
| Core Framework       | Next.js 14 (App Router) |
| Authentication       | NextAuth (Credentials + Google OAuth) |
| Database             | Firebase Firestore |
| File Storage         | Firebase Storage |
| Styling              | Tailwind CSS v4 |
| Animations           | Framer Motion |
| QR Generation        | qrcode library |

---

## **🗂️ Project Structure**

```
├── app/           ← Next.js App Router
│   ├── admin/     ← User dashboard & Super Admin
│   ├── [id]/      ← QR redirect routes (file access + view tracking)
│   ├── signin/    ← Sign in page
│   └── signup/    ← Sign up page
├── components/    ← File upload, QR code generator components
└── lib/           ← Firebase config and utilities
```

---

## **🔐 Security**
- NextAuth handles authentication with Credentials and Google providers.
- Firebase Security Rules ensure users can only access their own documents.
- Super Admin access restricted to configured email addresses via environment variables.

---

## **👤 Author**
Built by Ernest Kojo Owusu Essien — Software Engineer, Accra 🇬🇭
