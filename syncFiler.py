# Python script for å synkronisere filer

def sync_files_except_N_lines(original_file, duplicate_file, n_lines_to_keep):
    try:
        # Les de første N linjene fra duplikatfilen
        with open(duplicate_file, 'r') as file:
            first_lines = [next(file) for _ in range(n_lines_to_keep)]

        # Les resten av originalfilen
        with open(original_file, 'r') as file:
            rest_of_file = file.readlines()[n_lines_to_keep:]

        # Kombiner og skriv til duplikatfilen
        with open(duplicate_file, 'w') as file:
            file.writelines(first_lines + rest_of_file)

        print(f"Fil '{duplicate_file}' ble oppdatert basert på '{original_file}'")

    except FileNotFoundError:
        print(f"Feil: En av filene '{original_file}' eller '{duplicate_file}' ble ikke funnet.")
    except IndexError:
        print(f"Feil: Filen '{duplicate_file}' har ikke nok linjer ({n_lines_to_keep} forventet).")
    except Exception as e:
        print(f"En uventet feil oppstod: {e}")

    
if __name__ == '__main__':
    # Definer filstier
    original_file = './filtrerKalender.js'
    duplicate_file = './filtrerKalenderKopi.js'
    n_lines_to_keep = 4

    sync_files_except_N_lines(original_file,duplicate_file,n_lines_to_keep)

    original_file = './sletteKalender.js'
    duplicate_file = './sletteKalenderKopi.js'
    n_lines_to_keep = 2

    sync_files_except_N_lines(original_file,duplicate_file,n_lines_to_keep)