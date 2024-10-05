import * as fs from 'node:fs';
import * as path from 'node:path';

export interface PackageJson {
    name: string;
    version: string;
}

export function findPackageVersion(filePath: string): string | null | undefined {
    console.info('findPackageVersion', `${encodeURIComponent(filePath)}`);
    // Remove query string or hash from filepath
    filePath = getPathname(filePath);
    
    const packageFolder = getNearestPackageFolder(filePath);
    if (!packageFolder) return null;
    
    console.info('packageFolder', `${packageFolder}`);
    const packageFilePath = path.join(packageFolder, 'package.json');
    const packageObj: PackageJson = JSON.parse(fs.readFileSync(packageFilePath, { encoding: 'utf-8' }));
    
    return packageObj.version;
}

export function getNearestPackageFolder(filePath: string) {
    console.info('getNearestPackageFolder', `${filePath}`);
    console.info('isAbsolute', path.isAbsolute(filePath));
    let currentPath = path.isAbsolute(filePath) ? filePath : path.resolve(filePath);
    console.info('currentPath', `${currentPath}`);
    const root = path.parse(currentPath).root;

    while (currentPath !== root) {
        const parentPath = path.dirname(currentPath);

        if (path.basename(parentPath) === 'node_modules') {
            return currentPath;
        }

        currentPath = parentPath;
    }

    return null; // node_modules folder not found
}

function getPathname(filePath: string) {
    return filePath.replace(/[?#].*$/, '');
}