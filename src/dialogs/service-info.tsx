import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface UserSettingsDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ServiceInfo({ isOpen, onOpenChange }: UserSettingsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">Form content goes here...</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
