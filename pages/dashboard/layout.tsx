"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import DashboardPage from "./page"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/login/page")
    } else {
      setUser(JSON.parse(userData))
    }
    setIsLoading(false)
  }, [router])

  return (
    <SidebarProvider>
      {isLoading || !user ? (
        <div className="flex h-screen items-center justify-center">
          <div>Loading...</div>
        </div>
      ) : (
        <div className="flex w-full">
          <div className="w-40 border-r">
            <AppSidebar />
          </div>
          <main className="flex-1 overflow-auto">{children}
            <DashboardPage/>
          </main>
        </div>
      )}
    </SidebarProvider>
  )
}
