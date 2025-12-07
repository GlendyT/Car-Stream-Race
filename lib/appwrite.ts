import { Client, Databases } from "appwrite";
import { CreateMatchParams, History } from "../type";

export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  projectName: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME,

  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  historyCollectionId: process.env.NEXT_PUBLIC_APPWRITE_HISTORY_ID,
  matchCollectionId: process.env.NEXT_PUBLIC_APPWRITE_MATCH_ID,
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint!) // Your API Endpoint
  .setProject(appwriteConfig.projectId!); // Your project ID

export const databases = new Databases(client);

export const createMatch = async ({
  team1,
  team2,
  goal1,
  goal2,
}: CreateMatchParams) => {
  try {
    const newMatch = await databases.createDocument(
      appwriteConfig.databaseId!,
      appwriteConfig.matchCollectionId!,
      "unique()",
      {
        team1,
        team2,
        goal1,
        goal2,
      }
    );

    return newMatch;
  } catch (error) {
    console.error("Error creating match:", error);
    throw error;
  }
};


export const getCurrentMatch = async () => {
  try {
    const matches = await databases.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.matchCollectionId!,
      [
        // Ordenar por fecha de creación descendente para obtener el más reciente
      ]
    );

    if (matches.documents.length > 0) {
      return matches.documents[0];
    }
    return null;
  } catch (error) {
    console.error("Error getting current match:", error);
    throw error;
  }
};

export const updateMatch = async (
  documentId: string,
  data: Partial<CreateMatchParams>
) => {
  try {
    const updatedMatch = await databases.updateDocument(
      appwriteConfig.databaseId!,
      appwriteConfig.matchCollectionId!,
      documentId,
      data
    );
    return updatedMatch;
  } catch (error) {
    console.error("Error updating match:", error);
    throw error;
  }
};

export const deleteMatch = async (documentId: string) => {
  try {
    const response = await databases.deleteDocument(
      appwriteConfig.databaseId!,
      appwriteConfig.matchCollectionId!,
      documentId
    );
    return response;
  } catch (error) {
    console.error("Error deleting match:", error);
    throw error;
  }
};

// History functions
export const createHistory = async ({
  progress,
  date,
  matchId,
  team,
}: {
  progress: number;
  date: string;
  matchId: string;
  team: string;
}) => {
  try {
    const newHistory = await databases.createDocument(
      appwriteConfig.databaseId!,
      appwriteConfig.historyCollectionId!,
      "unique()",
      {
        progress,
        date,
        matchId,
        team,
      }
    );
    return newHistory;
  } catch (error) {
    console.error("Error creating history:", error);
    throw error;
  }
};

export const updateHistory = async (
  historyId: string,
  data: { progress?: number; date?: string }
) => {
  try {
    const updatedHistory = await databases.updateDocument(
      appwriteConfig.databaseId!,
      appwriteConfig.historyCollectionId!,
      historyId,
      data
    );
    return updatedHistory;
  } catch (error) {
    console.error("Error updating history:", error);
    throw error;
  }
};

export const getHistoryByMatch = async (matchId: string): Promise<History[]> => {
  try {
    const history = await databases.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.historyCollectionId!
    );
    // Filtrar por matchId en el cliente si Appwrite no soporta queries en tu plan
    return history.documents.filter((h) => (h as unknown as History).matchId === matchId) as unknown as History[];
  } catch (error) {
    console.error("Error getting history:", error);
    throw error;
  }
};

export const deleteHistoryByMatch = async (matchId: string) => {
  try {
    const histories = await getHistoryByMatch(matchId);
    await Promise.all(
      histories.map((history) =>
        databases.deleteDocument(
          appwriteConfig.databaseId!,
          appwriteConfig.historyCollectionId!,
          history.$id
        )
      )
    );
  } catch (error) {
    console.error("Error deleting histories:", error);
    throw error;
  }
};


