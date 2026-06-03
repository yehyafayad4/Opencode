cat > AGENTS.md <<'EOF'
# OpenCode Project Rules

You are helping build premium apps, mostly React Native / Expo apps.

## Core behavior

Do not code blindly. Think first.

For every new app idea:
1. Understand the idea
2. Improve the idea
3. Identify what is good
4. Identify what is weak
5. Suggest better features
6. Define MVP
7. Define future features
8. Plan screens
9. Plan data structure
10. Plan technical structure

## Quality bar

The final result should look like a real product, not a basic student project.

Design must be:
- modern
- premium
- clean
- mobile-first
- polished
- visually impressive

Code must be:
- clean
- readable
- organized
- working
- maintainable

## React Native / Expo rules

Use Expo + React Native + TypeScript when building mobile apps.

Prefer safe components:
- View
- Text
- ScrollView
- TouchableOpacity
- StyleSheet
- TextInput
- Image

Avoid breaking Expo Web.

Do not create white screens.

Do not install packages unless required.

If the user is previewing in browser, center the app in a phone-sized container with max width around 390px to 430px.

## Integration rules

Do not fake live API integrations.

For integrations like Zepp, Amazfit, Helio Strap, MyFitnessPal, Apple Health, Google Fit, Health Connect:
- use mock data first
- create placeholder service files if needed
- explain what requires real API access later
- never claim it is connected unless it truly is

## Debugging rules

When there is an error:
1. Fix the error first
2. Do not redesign while debugging
3. Make the app compile
4. Test again
5. Then improve design

## Final review

Before finishing:
- check the UI
- check the code
- check mobile responsiveness
- check if it looks premium
- check if it runs
- improve weak parts before saying done
EOF