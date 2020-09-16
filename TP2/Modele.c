#include "Modele.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/**
* Chargement d'un fichier représentant un LP sous le format suivant :
* N M -> le nombre de variables et le nombre de contraintes
* max/min c_1 X1 + c_2 X2 - c_5 X5 .... -> la fonction objectif
* Pour chaque contrainte :
* c_1 X1 + c_2 X2 - c_5 X5 .... <= ou >= b
*
* Toutes les variables se nomment Xi, avec i entre 1 et N
* Il n'est pas nécessaire d'écrire les 0 : si une variable n'intervient pas dans l'objectif ou une contrainte, pas besoin d'écrire + 0 Xi
* Pour plus de détails, voir les fichiers lp fournis en exemple
**/
Modele* chargerModele(char* nomFichier){
	FILE* fichier = fopen(nomFichier, "r");
	if (!fichier){
		printf("Impossible d'ouvrir le fichier %s, abandon...\n", nomFichier);
		return NULL;
	}
	Modele* modele = (Modele*)calloc(1, sizeof(Modele));
	if (!modele){
		printf("Impossible d'allouer de modele, abandon...\n");
		fclose(fichier);
		return NULL;
	}
	fscanf(fichier, "%d %d\n", &(modele->N), &(modele->M));
	int N = modele->N;

	modele->z = (float*)calloc(modele->N, sizeof(float));
	char buffer[4096];
	fscanf(fichier, "%[^\n]", buffer);
	
	char* tok = strtok(buffer, " ");
	if (!tok){
		printf("Impossible de lire l'objectif, abandon...\n");
		detruireModele(modele);
		fclose(fichier);
		return NULL;
	}
	if (strcmp(tok, "min")==0){
		modele->type = 1;
	}
	else if (strcmp(tok, "max")==0){
		modele->type = 0;
	}
	else{
		printf("Attendu min ou max, rencontré %s, abandon...\n", tok);
		detruireModele(modele);
		fclose(fichier);
		return NULL;
	}
	
	
	float value = 1;
	while (1){
		tok = strtok(NULL, " ");
		if (!tok) break;
		
		if (tok[0]=='+') continue;
		if (tok[0]=='-'){
			value = -1;
			continue;
		}
		if (tok[0]=='X'){
			int id = atoi(tok+1);
			modele->z[id-1] = value;
			value = 1;
			continue;
		}
		value*=atof(tok);
	}
	char c;
	modele->contraintes = (Contrainte*)calloc(modele->M, sizeof(Contrainte));
	for (int i=0; i<modele->M; i++){
		modele->contraintes[i].coeff = (float*)calloc(N, sizeof(float));
		fscanf(fichier, "%c", &c);
		fscanf(fichier, "%[^\n]", buffer);
		value = 1;
		int first = 1;
		while (1){
			if (first){
				tok = strtok(buffer, " ");
				first = 0;
			}
			else{
				tok = strtok(NULL, " ");
			}
			if (!tok) break;

			if ((tok[0]=='<')||(tok[0]=='>')){
				modele->contraintes[i].type = (tok[0]=='>');
				tok = strtok(NULL, " ");
				modele->contraintes[i].constante = atof(tok);
				if ((modele->contraintes[i].constante==0)&&(modele->contraintes[i].type)){ //X>=0 --> -X<=0 économie d'une variable artificielle et évite certains problèmes
					modele->contraintes[i].type = 0;
					for (int j=0; j<N; j++) modele->contraintes[i].coeff[j]*=-1;
				}
				else if (modele->contraintes[i].constante<0){ //Application des règles de réécriture 
					modele->contraintes[i].type = 1 - modele->contraintes[i].type;
					modele->contraintes[i].constante = -1*modele->contraintes[i].constante;
					for (int j=0; j<N; j++) modele->contraintes[i].coeff[j]*=-1;
				}
				
				break;
			}
			if (tok[0]=='='){
				tok = strtok(NULL, " ");
				modele->contraintes[i].constante = atof(tok);
				if (modele->contraintes[i].constante<0){
					modele->contraintes[i].constante*=-1;
					for (int j=0; j<N; j++) modele->contraintes[i].coeff[j]*=-1;
				}
				modele->contraintes[i].type = 0;
				modele->M++;
				Contrainte* contraintes_ = (Contrainte*)calloc(modele->M, sizeof(Contrainte));
				for (int k=0; k<=i; k++){
					contraintes_[k].coeff = modele->contraintes[k].coeff;
					contraintes_[k].type = modele->contraintes[k].type;
					contraintes_[k].constante = modele->contraintes[k].constante;
				}
				free(modele->contraintes);
				modele->contraintes = contraintes_;
				i++;
				
				modele->contraintes[i].coeff = (float*)calloc(N, sizeof(float));
				modele->contraintes[i].constante = modele->contraintes[i-1].constante;
				for (int k=0; k<N; k++){
					modele->contraintes[i].coeff[k] = (modele->contraintes[i].constante>0)?modele->contraintes[i-1].coeff[k]:-1*(modele->contraintes[i-1].coeff[k]);
				}
				modele->contraintes[i].type = (modele->contraintes[i].constante>0)?1:0;	
				break;
			}
			
			
			
			if (tok[0]=='+') continue;
			if (tok[0]=='-'){
				value = -1;
				continue;
			}
			if (tok[0]=='X'){
				int id = atoi(tok+1);
				modele->contraintes[i].coeff[id-1] = value;
				value = 1;
				continue;
			}
			value*=atof(tok);
		}
	}
	
	fclose(fichier);
	return modele;
}

void afficherModele(Modele* modele){
	if (!modele){
		printf("Modele NULL\n");
		return;
	}
	int N = modele->N;
	int M = modele->M;
	
	if (modele->type){
		printf("Minimiser z = ");
	}
	else{
		printf("Maximiser z = ");
	}
	
	char first = 1;
	for (int i=0; i<N; i++){
		if (modele->z[i]==0) continue;
		
		if (modele->z[i]<0){
			first = 0;
			printf("%.2f X_%d", modele->z[i], i+1);
		}
		else{
			if (first){
				first = 0;
			}
			else{
				printf(" +");
			}
			printf(" %.2f X_%d", modele->z[i], i+1);
		}
	}
	printf("\nS.c : \n");
	
	for (int j=0; j<M; j++){
		first = 1;
		for (int i=0; i<N; i++){
			if (modele->contraintes[j].coeff[i]==0) continue;
			
			if (modele->contraintes[j].coeff[i]<0){
				first = 0;
				printf(" %.2f X_%d", modele->contraintes[j].coeff[i], i+1);
			}
			else{
				if (first){
					first = 0;
				}
				else{
					printf(" +");
				}
				printf(" %.2f X_%d", modele->contraintes[j].coeff[i], i+1);
			}
		}
		if (modele->contraintes[j].type==0){
			printf("<=%.2f\n", modele->contraintes[j].constante);
		}
		else{
			printf(">=%.2f\n", modele->contraintes[j].constante);
		}
	}
	
	
}

void detruireModele(Modele* modele){
	if (!modele) return;
	
	if (modele->z) free(modele->z);
	if (modele->contraintes){
		for (int i=0; i<modele->N; i++){
			if (modele->contraintes[i].coeff) free(modele->contraintes[i].coeff);
		}
		free(modele->contraintes);
	}
	free(modele);
}
