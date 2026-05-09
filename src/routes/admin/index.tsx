import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Image as ImageIcon, Briefcase, MessageSquare, ArrowUpRight, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useHero } from "@/hooks/use-hero";
import { useServices } from "@/hooks/use-services";
import { useGallery } from "@/hooks/use-gallery";
import { useTestimonials } from "@/hooks/use-testimonials";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { heroQuery } = useHero();
  const { servicesQuery } = useServices();
  const { galleryQuery } = useGallery();
  const { testimonialsQuery } = useTestimonials();

  const stats = [
    { label: "Total Services", value: servicesQuery.data?.length || 0, icon: Briefcase, color: "bg-blue-500" },
    { label: "Gallery Images", value: galleryQuery.data?.length || 0, icon: ImageIcon, color: "bg-purple-500" },
    { label: "Testimonials", value: testimonialsQuery.data?.length || 0, icon: MessageSquare, color: "bg-green-500" },
    { label: "Hero Slides", value: heroQuery.data?.length || 0, icon: ImageIcon, color: "bg-orange-500" },
  ];

  const quickActions = [
    { label: "Add New Service", to: "/admin/services", icon: Briefcase },
    { label: "Update Hero", to: "/admin/hero", icon: ImageIcon },
    { label: "Add Gallery Image", to: "/admin/gallery", icon: ImageIcon },
    { label: "Manage Reviews", to: "/admin/testimonials", icon: MessageSquare },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your website.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl ${stat.color} text-white shadow-lg`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <TrendingUp className="h-3 w-3" />
                Live
              </span>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-1 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-lg">Quick Actions</h3>
              <Link to="/admin/services" className="text-sm text-blue-600 font-medium hover:underline">View all</Link>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.to}
                  className="flex flex-col gap-4 p-5 rounded-2xl border border-border hover:border-black hover:bg-black hover:text-white transition-all group"
                >
                  <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{action.label}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-border p-6">
            <h3 className="font-semibold text-lg mb-6">Recent Activity</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex-shrink-0 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    Mock API system initialized with demo data. All CRUD operations are now being handled locally.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Just now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
