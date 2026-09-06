import { 
    Dialog, 
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card" 
import { Field, FieldGroup } from "@/components/ui/field"
import { useState } from "react"
import { API_URL } from "@/lib/endpoints"

interface AddRepoDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

export default function AddRepoDialog({ isOpen, onOpenChange }: AddRepoDialogProps) {

    const [repoUrl, setRepoUrl] = useState<string>("");
    const [repoTitle, setRepoTitle] = useState<string>("");
    const [repoStatus, setRepoStatus] = useState<string>("");

    async function add_repo(){
        const _url = `${API_URL}/repos/add`;
        const body = {url: repoUrl};

        const request = await fetch(_url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await request.json();
        if(request.status == 200){
            setRepoTitle(response['title']);
            setRepoStatus(response['status']);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="space-y-1.5">
                    <DialogTitle className="text-xl font-semibold tracking-tight">
                        Add New Repository
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Enter the repository details below to add it to your dashboard.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-5">
                    <FieldGroup className="space-y-4">
                        <Field className="grid gap-2">
                            <Label htmlFor="repo-url" className="text-sm font-medium tracking-wide">
                                Repository URL
                            </Label>
                            <Input 
                                id="repo-url" 
                                placeholder="https://github.com"
                                className="w-full"
                                value={repoUrl}
                                onChange={(event) => {
                                    setRepoUrl(event.target.value);
                                }}
                            />
                        </Field>
                    </FieldGroup>


                    <Card className="bg-muted/30 shadow-none">
                        <CardContent className="text-sm space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-muted-foreground">Title:</span>
                                <span className="text-foreground font-medium">{repoTitle}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-muted-foreground">Status:</span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border">
                                    {repoStatus}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <DialogFooter>
                    <Button 
                        variant="outline" 
                        onClick={() => onOpenChange(false)}
                        type="button"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" onClick={() => {
                        add_repo();
                    }}>
                        Add Repository
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
