import { IconButton, IconButtonProps, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useEffect } from "react";
import { cn } from "../lib/utils";

export const ThemeToggle = ({ className, ...props }: Omit<IconButtonProps, 'aria-label'>) => {
    const { colorMode, toggleColorMode } = useColorMode();

    useEffect(() => {
        if (colorMode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [colorMode]);

    return (
        <IconButton
            aria-label="Toggle theme"
            icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
            onClick={toggleColorMode}
            variant="ghost"
            className={cn("transition-colors", className)}
            {...props}
        />
    );
};
