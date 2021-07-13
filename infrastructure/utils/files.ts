import { promises as fs } from "fs";
import { resolve, join } from "path";
import { lookup } from "mime-types";

/**
 * Representation of a File Asset, to use with Pulumi
 */
export interface FileAsset {
  path: string;
  name: string;
  type: string;
}

/**
 * Recursively crawl a folder contents and return file assets
 * @param source Source folder
 * @param [root] To use with recursion
 * @param [parent] To use with recursion
 * @returns Array containing all of the files, represented as file assets
 */
export async function getFilesToUpload(
  source: string,
  root = "",
  parent = ""
): Promise<FileAsset[]> {
  const fullSource = join(root, parent, source);
  const isValidDirectory = (await fs.lstat(fullSource)).isDirectory();
  if (!isValidDirectory) throw new Error(`Invalid directory ${fullSource}`);

  const sourceContents = await Promise.all(
    (
      await fs.readdir(fullSource)
    ).flatMap(async (path) => {
      const contentStat = await fs.lstat(join(root, parent, source, path));

      if (contentStat.isDirectory()) {
        const contents = await getFilesToUpload(
          path,
          root || source,
          fullSource.replace(root || source, "")
        );
        return contents.flat();
      } else {
        const file: FileAsset = {
          path: resolve(join(root, parent, source, path)),
          name: join(parent, root ? source : "", path).replace(/^\//, ""),
          type: lookup(path) || "plain/text",
        };
        return file;
      }
    })
  );

  return sourceContents.flat();
}
